export const AnimeList = ({ animes, loading, error, favorites, toggleFavorite, toggleBlock }) => {
  if (loading) return <p className="status-message">Cargando catálogo desde Kitsu API...</p>;
  if (error) return <p className="status-message status-error">Error: {error}</p>;
  if (!animes || animes.length === 0) {
    return <p className="status-message">No se encontraron resultados para tu búsqueda.</p>;
  }

  return (
    <div className="anime-grid">
      {animes.map((anime) => {
        const isFavorite = favorites.some((fav) => fav.id === anime.id);
        const title = anime.attributes?.canonicalTitle || anime.attributes?.titles?.en || 'Título no disponible';
        const poster =
          anime.attributes?.posterImage?.small ||
          anime.attributes?.posterImage?.original ||
          'https://placehold.co/300x450?text=Sin+imagen';

        return (
          <article key={anime.id} className="anime-card">
            <img src={poster} alt={`Poster de ${title}`} className="anime-poster" />

            <h3 className="anime-title">{title}</h3>

            <div className="anime-actions">
              <button
                onClick={() => toggleFavorite(anime)}
                className={`action-button ${isFavorite ? 'button-secondary' : 'button-primary'}`}
                aria-label={isFavorite ? `Quitar ${title} de favoritos` : `Agregar ${title} a favoritos`}
              >
                {isFavorite ? '★ Quitar' : '☆ Favorito'}
              </button>

              <button
                onClick={() => toggleBlock(anime)}
                className="action-button button-dark"
                aria-label={`Bloquear ${title}`}
              >
                🚫 Bloquear
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};
