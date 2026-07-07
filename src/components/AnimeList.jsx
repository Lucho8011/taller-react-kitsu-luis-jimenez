import React from 'react';

export const AnimeList = ({ animes, loading, error, favorites, toggleFavorite }) => {
  if (loading) return <p>Cargando catálogo desde Kitsu API...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!animes || animes.length === 0) return <p>No se encontraron resultados.</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
      {animes.map((anime) => {
        // Comprobación booleana de estado derivado
        const isFavorite = favorites.some(fav => fav.id === anime.id);

        return (
          <div key={anime.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', background: '#fff', display: 'flex', flexDirection: 'column' }}>
            <img
              src={anime.attributes.posterImage.small}
              alt={anime.attributes.canonicalTitle}
              style={{ width: '100%', borderRadius: '4px', objectFit: 'cover' }}
            />
            <h3 style={{ fontSize: '1rem', marginTop: '10px', color: '#333', flex: 1 }}>
              {anime.attributes.canonicalTitle}
            </h3>
            
            <button
              onClick={() => toggleFavorite(anime)}
              style={{
                marginTop: '10px',
                padding: '10px',
                cursor: 'pointer',
                borderRadius: '4px',
                fontWeight: 'bold',
                transition: 'all 0.2s',
                // Cambio dinámico de estilos según el estado
                background: isFavorite ? '#fff' : '#ff4b4b',
                color: isFavorite ? '#ff4b4b' : '#fff',
                border: isFavorite ? '2px solid #ff4b4b' : '2px solid transparent',
              }}
            >
              {isFavorite ? '★ Quitar Favorito' : '☆ Marcar Favorito'}
            </button>
          </div>
        );
      })}
    </div>
  );
};