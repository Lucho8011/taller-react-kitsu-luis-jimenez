import { useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AnimeList } from './components/AnimeList';
import { SearchBar } from './components/SearchBar';
import { Sidebar } from './components/Sidebar';
import './index.css';

function App() {
  const { data: animes, loading, error } = useFetch('https://kitsu.io/api/edge/anime?page[limit]=20');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useLocalStorage('kitsu_favorites', []);
  const [blocked, setBlocked] = useLocalStorage('kitsu_blocked', []);
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredAnimes = animes
    ? animes.filter((anime) => {
        const title = anime.attributes?.canonicalTitle || anime.attributes?.titles?.en || '';
        const matchesSearch = title.toLowerCase().includes(normalizedSearch);
        const isNotBlocked = !blocked.some((item) => item.id === anime.id);
        return matchesSearch && isNotBlocked;
      })
    : [];

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

      setFavorites((prevFavs) => prevFavs.filter((item) => item.id !== anime.id));
      return [...prevBlocked, anime];
    });
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Proyecto Front-End con React + Kitsu API</p>
        <h1 className="app-title">Directorio de Anime</h1>
        <p className="app-subtitle">
          Explora animes, filtra por título y gestiona tus favoritos y bloqueados con persistencia local.
        </p>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>

      <main className="main-layout">
        <section className="content-section">
          <div className="section-heading">
            <h2>Catálogo ({filteredAnimes.length})</h2>
            <p className="helper-text">La búsqueda filtra el conjunto actualmente consultado desde la API.</p>
          </div>

          <AnimeList
            animes={filteredAnimes}
            loading={loading}
            error={error}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            toggleBlock={toggleBlock}
          />
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
      </footer>
    </div>
  );
}

export default App;
