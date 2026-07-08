import React, { useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { AnimeList } from './components/AnimeList';
import { SearchBar } from './components/SearchBar';
import { Sidebar } from './components/Sidebar';
import './index.css';

function App() {
  const { data: animes, loading, error } = useFetch('https://kitsu.io/api/edge/anime?page[limit]=20');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  
  // Nuevo estado para elementos bloqueados
  const [blocked, setBlocked] = useState([]);

  // Lógica de filtrado doble (Búsqueda + Exclusión de bloqueados)
  const filteredAnimes = animes 
    ? animes.filter(anime => {
        const matchesSearch = anime.attributes.canonicalTitle.toLowerCase().includes(searchTerm.toLowerCase());
        const isNotBlocked = !blocked.some(b => b.id === anime.id);
        return matchesSearch && isNotBlocked;
      }) 
    : [];

  const toggleFavorite = (anime) => {
    setFavorites(prevFavorites => {
      const exists = prevFavorites.some(fav => fav.id === anime.id);
      if (exists) return prevFavorites.filter(fav => fav.id !== anime.id);
      return [...prevFavorites, anime];
    });
  };

  // Controlador de bloqueo con regla de negocio cruzada
  const toggleBlock = (anime) => {
    setBlocked(prevBlocked => {
      const isBlocked = prevBlocked.some(b => b.id === anime.id);
      if (isBlocked) {
        // Si está bloqueado, lo desbloquea
        return prevBlocked.filter(b => b.id !== anime.id);
      } else {
        // Si se va a bloquear, exige retirarlo de favoritos automáticamente
        setFavorites(prevFavs => prevFavs.filter(f => f.id !== anime.id));
        return [...prevBlocked, anime];
      }
    });
  };

  return (
    <div className="app-container" style={{ padding: '20px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ color: '#ff4b4b' }}>Directorio de Anime - Kitsu API</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>
      
      <main style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <section style={{ flex: '3' }}>
          <h2 style={{ marginBottom: '15px' }}>Catálogo ({filteredAnimes.length})</h2>
          <AnimeList 
            animes={filteredAnimes} 
            loading={loading} 
            error={error} 
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            toggleBlock={toggleBlock}
          />
        </section>

        <aside style={{ flex: '1', borderLeft: '2px solid #eaeaea', paddingLeft: '20px', minWidth: '300px' }}>
          <h2>Gestión de Listas</h2>
          {/* Inyectamos los nuevos datos al Sidebar */}
          <Sidebar 
            favorites={favorites} 
            toggleFavorite={toggleFavorite} 
            blocked={blocked}
            toggleBlock={toggleBlock}
          />
        </aside>
      </main>
    </div>
  );
}

export default App;