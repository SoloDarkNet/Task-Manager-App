function SearchFilter({ search, setSearch }) {
  return (
    <input
      type="text"
      className="form-control mb-5"
      placeholder="Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchFilter;
