import { useEffect, useMemo, useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AnimeList } from './components/AnimeList';
import { SearchBar } from './components/SearchBar';
import { Sidebar } from './components/Sidebar';
import './index.css';

// Componente raíz que coordina búsqueda remota, paginación incremental
// y filtros locales sobre favoritos y bloqueados.
function App() {
  const PAGE_LIMIT = 20;
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [pageOffset, setPageOffset] = useState(0);
  const [favorites, setFavorites] = useLocalStorage('kitsu_favorites', []);
  const [blocked, setBlocked] = useLocalStorage('kitsu_blocked', []);
  const normalizedSearch = searchTerm.trim();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(normalizedSearch);
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [normalizedSearch]);

  const apiUrl = useMemo(() => {
    const baseUrl = `https://kitsu.io/api/edge/anime?page[limit]=${PAGE_LIMIT}&page[offset]=${pageOffset}`;

    if (!debouncedSearch) {
      return baseUrl;
    }

    return `${baseUrl}&filter[text]=${encodeURIComponent(debouncedSearch)}`;
  }, [PAGE_LIMIT, debouncedSearch, pageOffset]);

  const { data: animes, loading, error, nextPage } = useFetch(apiUrl, {
    append: pageOffset > 0,
    resetKey: debouncedSearch,
  });

  const filteredAnimes = animes
    ? animes.filter((anime) => {
        const isNotBlocked = !blocked.some((item) => item.id === anime.id);
        return isNotBlocked;
      })
    : [];

  const hasMore = Boolean(nextPage);
  const isLoadingInitial = loading && (!animes || animes.length === 0);
  const isLoadingMore = loading && Boolean(animes && animes.length > 0);
  const blockedVisibleCount = (animes?.length || 0) - filteredAnimes.length;

  // Reinicia la paginación cuando cambia el criterio de búsqueda.
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setPageOffset(0);
  };

  const toggleFavorite = (anime) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((fav) => fav.id === anime.id);
      if (exists) return prevFavorites.filter((fav) => fav.id !== anime.id);
      return [...prevFavorites, anime];
    });
  };

  const toggleBlock = (anime) => {
    setBlocked((prevBlocked) => {
      const isBlocked = prevBlocked.some((item) => item.id === anime.id);

      if (isBlocked) {
        return prevBlocked.filter((item) => item.id !== anime.id);
      }

      // Mantiene coherencia entre listas: un anime bloqueado no puede seguir en favoritos.
      setFavorites((prevFavs) => prevFavs.filter((item) => item.id !== anime.id));
      return [...prevBlocked, anime];
    });
  };

  // Solicita la siguiente página solo cuando la API indica que existen más resultados.
  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    setPageOffset((currentOffset) => currentOffset + PAGE_LIMIT);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="topbar">
          <p className="eyebrow">Proyecto Front-End con React + Kitsu API</p>
          <nav className="topbar-nav" aria-label="Resumen de navegación">
            <span>Catálogo</span>
            <span>Favoritos</span>
            <span>Bloqueados</span>
          </nav>
        </div>

        <section className="hero-panel">
          <div className="hero-copy">
            <p className="hero-kicker">Anime Discovery</p>
            <h1 className="app-title">Directorio de Anime</h1>
            <p className="app-subtitle">
              Explora animes, filtra por título y gestiona tus favoritos y bloqueados con persistencia local.
            </p>
            <div className="hero-metrics" aria-label="Resumen de estado">
              <div className="hero-metric">
                <span className="hero-metric-label">Resultados visibles</span>
                <strong>{filteredAnimes.length}</strong>
              </div>
              <div className="hero-metric">
                <span className="hero-metric-label">Favoritos</span>
                <strong>{favorites.length}</strong>
              </div>
              <div className="hero-metric">
                <span className="hero-metric-label">Bloqueados</span>
                <strong>{blocked.length}</strong>
              </div>
            </div>
          </div>

          <div className="hero-search-card">
            <p className="hero-search-title">Buscar en Kitsu</p>
            <p className="hero-search-text">
              Consulta resultados reales desde la API y mantén tu biblioteca personal ordenada.
            </p>
            <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
          </div>
        </section>
      </header>

      <main className="main-layout">
        <section className="content-section">
          <div className="section-heading">
            <h2>Catálogo ({filteredAnimes.length})</h2>
            <p className="helper-text">
              {debouncedSearch
                ? `Mostrando resultados reales para "${debouncedSearch}" desde la API.`
                : 'Mostrando el catálogo general consultado desde la API.'}
            </p>
            {blockedVisibleCount > 0 && (
              <p className="helper-note">
                {blockedVisibleCount} resultado{blockedVisibleCount > 1 ? 's fueron ocultos' : ' fue ocultado'} por tu lista de bloqueados.
              </p>
            )}
          </div>

          <AnimeList
            animes={filteredAnimes}
            loading={isLoadingInitial}
            error={error}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            toggleBlock={toggleBlock}
          />

          {(hasMore || isLoadingMore) && (
            <div className="pagination-block">
              <button
                type="button"
                onClick={handleLoadMore}
                className="load-more-button"
                disabled={isLoadingMore}
              >
                {isLoadingMore ? 'Cargando más resultados...' : 'Cargar más'}
              </button>
            </div>
          )}
        </section>

        <aside className="sidebar-section">
          <h2>Gestión de Listas</h2>
          <Sidebar
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            blocked={blocked}
            toggleBlock={toggleBlock}
            totalElements={animes ? animes.length : 0}
          />
        </aside>
      </main>

      <footer className="app-footer">
        <p>
          <strong>Proyecto Front-End</strong> | Desarrollado por: Luis Jimenez
        </p>
        <p className="footer-note">React + Vite + Kitsu API | Taller final 2026</p>
      </footer>
    </div>
  );
}

export default App;
