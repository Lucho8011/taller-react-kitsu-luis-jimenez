export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar">
      <label className="sr-only" htmlFor="anime-search">
        Buscar anime por título
      </label>
      <input
        id="anime-search"
        type="text"
        placeholder="Buscar anime por título..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
};
