import React from 'react';

export const AnimeList = ({ animes, loading, error }) => {
  // Manejo de estados exigido por la rúbrica
  if (loading) return <p>Cargando catálogo desde Kitsu API...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!animes || animes.length === 0) return <p>No se encontraron resultados.</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
      {animes.map((anime) => (
        <div key={anime.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', background: '#fff' }}>
          <img
            // Navegamos por la estructura JSON de Kitsu para extraer la imagen
            src={anime.attributes.posterImage.small}
            alt={anime.attributes.canonicalTitle}
            style={{ width: '100%', borderRadius: '4px', objectFit: 'cover' }}
          />
          <h3 style={{ fontSize: '1rem', marginTop: '10px', color: '#333' }}>
            {anime.attributes.canonicalTitle}
          </h3>
        </div>
      ))}
    </div>
  );
};