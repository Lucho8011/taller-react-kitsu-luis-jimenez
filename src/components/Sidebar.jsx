import React from 'react';

export const Sidebar = ({ favorites, toggleFavorite, blocked, toggleBlock, totalElements }) => {
  return (
    <div style={{ marginTop: '15px' }}>
      
      {/* Sección de Estadísticas */}
      <div style={{ marginBottom: '25px', padding: '15px', background: '#fff', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>📊 Estadísticas</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#555' }}>
          <li style={{ marginBottom: '5px' }}>Totales consultados: <strong>{totalElements}</strong></li>
          <li style={{ marginBottom: '5px' }}>Total Favoritos: <strong style={{ color: '#ff4b4b' }}>{favorites.length}</strong></li>
          <li>Total Bloqueados: <strong>{blocked.length}</strong></li>
        </ul>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#ff4b4b' }}>★ Favoritos</h3>
        {favorites.length === 0 ? (
          <p style={{ color: '#666', fontSize: '0.9rem' }}>No tienes animes favoritos aún.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {favorites.map(anime => (
              <li key={anime.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '10px', background: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                <span style={{ fontSize: '0.85rem', flex: 1, fontWeight: 'bold' }}>{anime.attributes.canonicalTitle}</span>
                <button onClick={() => toggleFavorite(anime)} style={{ background: '#ff4b4b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '4px 8px', fontSize: '0.75rem' }}>X</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 style={{ marginBottom: '15px', color: '#333' }}>🚫 Bloqueados</h3>
        {blocked.length === 0 ? (
          <p style={{ color: '#666', fontSize: '0.9rem' }}>No hay animes bloqueados.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {blocked.map(anime => (
              <li key={anime.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '10px', background: '#f5f5f5', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                <span style={{ fontSize: '0.85rem', flex: 1, color: '#666' }}>{anime.attributes.canonicalTitle}</span>
                <button onClick={() => toggleBlock(anime)} style={{ background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '4px 8px', fontSize: '0.75rem' }}>Desbloquear</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};