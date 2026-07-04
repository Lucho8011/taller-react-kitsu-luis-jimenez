import React from 'react';
import { useFetch } from './hooks/useFetch';
import { AnimeList } from './components/AnimeList';
import './index.css';

function App() {
  // Consumimos la API solicitando los primeros 20 animes
  const { data: animes, loading, error } = useFetch('https://kitsu.io/api/edge/anime?page[limit]=20');

  return (
    <div className="app-container" style={{ padding: '20px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ color: '#ff4b4b' }}>Directorio de Anime - Kitsu API</h1>
        {/* Aquí irá el SearchBar en la Fase 3 */}
      </header>
      
      <main style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <section style={{ flex: '3' }}>
          <h2 style={{ marginBottom: '15px' }}>Catálogo</h2>
          <AnimeList animes={animes} loading={loading} error={error} />
        </section>

        <aside style={{ flex: '1', borderLeft: '2px solid #eaeaea', paddingLeft: '20px', minWidth: '250px' }}>
          <h2>Favoritos / Estadísticas</h2>
          <p style={{ color: '#666' }}>Panel en construcción...</p>
        </aside>
      </main>
    </div>
  );
}

export default App;