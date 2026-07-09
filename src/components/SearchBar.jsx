export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar">
      <label className="sr-only" htmlFor="anime-search">
        Buscar anime por título
      </label>
      <div className="search-input-wrap">
        <input
          id="anime-search"
          type="text"
          placeholder="Buscar anime por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          autoComplete="off"
        />
        {searchTerm && (
          <button
            type="button"
            className="search-clear-button"
            onClick={() => setSearchTerm('')}
            aria-label="Limpiar búsqueda"
          >
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
};
