import React, { useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { AnimeList } from './components/AnimeList';
import { SearchBar } from './components/SearchBar';
import './index.css';

function App() {
  const { data: animes, loading, error } = useFetch('https://kitsu.io/api/edge/anime?page[limit]=20');
  
  // Estado para controlar el texto de la barra de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Lógica de filtrado (Estado Derivado)
  const filteredAnimes = animes 
    ? animes.filter(anime => 
        anime.attributes.canonicalTitle.toLowerCase().includes(searchTerm.toLowerCase())
      ) 
    : [];

  return (
    <div className="app-container" style={{ padding: '20px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ color: '#ff4b4b' }}>Directorio de Anime - Kitsu API</h1>
        
        {/* Implementación de la barra de búsqueda */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>
      
      <main style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <section style={{ flex: '3' }}>
          {/* Mostramos dinámicamente la cantidad de resultados filtrados */}
          <h2 style={{ marginBottom: '15px' }}>Catálogo ({filteredAnimes.length})</h2>
          
          {/* Pasamos el arreglo filtrado en lugar del original */}
          <AnimeList animes={filteredAnimes} loading={loading} error={error} />
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