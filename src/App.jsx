import React, { useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { AnimeList } from './components/AnimeList';
import { SearchBar } from './components/SearchBar';
import { Sidebar } from './components/Sidebar';
import './index.css';

function App() {
  const { data: animes, loading, error } = useFetch('https://kitsu.io/api/edge/anime?page[limit]=20');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para almacenar los objetos marcados como favoritos
  const [favorites, setFavorites] = useState([]);

  // Lógica de filtrado
  const filteredAnimes = animes 
    ? animes.filter(anime => 
        anime.attributes.canonicalTitle.toLowerCase().includes(searchTerm.toLowerCase())
      ) 
    : [];

  // Controlador de mutación del estado (Agregar/Quitar)
  const toggleFavorite = (anime) => {
    setFavorites(prevFavorites => {
      const exists = prevFavorites.some(fav => fav.id === anime.id);
      if (exists) {
        // Si existe, lo filtramos para eliminarlo
        return prevFavorites.filter(fav => fav.id !== anime.id);
      } else {
        // Si no existe, creamos un nuevo arreglo agregando el elemento
        return [...prevFavorites, anime];
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
          />
        </section>

        <aside style={{ flex: '1', borderLeft: '2px solid #eaeaea', paddingLeft: '20px', minWidth: '300px' }}>
          <h2>Favoritos / Estadísticas</h2>
          <Sidebar favorites={favorites} toggleFavorite={toggleFavorite} />
        </aside>
      </main>
    </div>
  );
}

export default App;