export const Sidebar = ({ favorites, toggleFavorite, blocked, toggleBlock, totalElements }) => {
  return (
    <div className="sidebar-content">
      <div className="stats-card">
        <h3 className="sidebar-title">📊 Estadísticas</h3>
        <ul className="plain-list stats-list">
          <li>Totales consultados: <strong>{totalElements}</strong></li>
          <li>
            Total Favoritos: <strong className="text-accent">{favorites.length}</strong>
          </li>
          <li>Total Bloqueados: <strong>{blocked.length}</strong></li>
        </ul>
      </div>

      <div className="sidebar-block">
        <h3 className="sidebar-title text-accent">★ Favoritos</h3>
        {favorites.length === 0 ? (
          <p className="empty-text">No tienes animes favoritos aún.</p>
        ) : (
          <ul className="plain-list">
            {favorites.map((anime) => {
              const title = anime.attributes?.canonicalTitle || 'Título no disponible';

              return (
                <li key={anime.id} className="sidebar-item">
                  <span className="sidebar-item-title">{title}</span>
                  <button
                    onClick={() => toggleFavorite(anime)}
                    className="mini-button button-primary"
                    aria-label={`Quitar ${title} de favoritos`}
                  >
                    Quitar
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="sidebar-block">
        <h3 className="sidebar-title">🚫 Bloqueados</h3>
        {blocked.length === 0 ? (
          <p className="empty-text">No hay animes bloqueados.</p>
        ) : (
          <ul className="plain-list">
            {blocked.map((anime) => {
              const title = anime.attributes?.canonicalTitle || 'Título no disponible';

              return (
                <li key={anime.id} className="sidebar-item sidebar-item-muted">
                  <span className="sidebar-item-title">{title}</span>
                  <button
                    onClick={() => toggleBlock(anime)}
                    className="mini-button button-dark"
                    aria-label={`Desbloquear ${title}`}
                  >
                    Desbloquear
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
