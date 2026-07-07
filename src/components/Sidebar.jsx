import React from 'react';

export const Sidebar = ({ favorites, toggleFavorite }) => {
  return (
    <div style={{ marginTop: '15px' }}>
      <h3 style={{ marginBottom: '15px', color: '#333' }}>Tus Favoritos ({favorites.length})</h3>
      
      {favorites.length === 0 ? (
        <p style={{ color: '#666', fontSize: '0.9rem' }}>No tienes animes favoritos aún.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {favorites.map(anime => (
            <li key={anime.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', gap: '10px', background: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
              <img
                src={anime.attributes.posterImage.small}
                alt={anime.attributes.canonicalTitle}
                style={{ width: '40px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <span style={{ fontSize: '0.85rem', flex: 1, fontWeight: 'bold' }}>
                {anime.attributes.canonicalTitle}
              </span>
              <button
                onClick={() => toggleFavorite(anime)}
                style={{ background: '#ff4b4b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '6px 10px', fontSize: '0.75rem' }}
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};