import React from 'react';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Directorio de Anime - Kitsu API</h1>
        {/* Aquí irá el SearchBar */}
      </header>
      
      <main style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <section style={{ flex: '3' }}>
          <h2>Resultados</h2>
          {/* Aquí irá el AnimeList */}
        </section>

        <aside style={{ flex: '1', borderLeft: '1px solid #ccc', paddingLeft: '20px' }}>
          <h2>Favoritos / Estadísticas</h2>
          {/* Aquí irá el Sidebar */}
        </aside>
      </main>
    </div>
  );
}

export default App;