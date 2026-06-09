function FilterBar({ searchTerm, setSearchTerm, selectedType, setSelectedType, count }) {
  return (
    <div className="filter-bar">
      <svg
        className="filter-bar__icon"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>

      <input
        className="filter-bar__input"
        type="text"
        placeholder="Search notifications…"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        className="filter-bar__select"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">All types</option>
        <option value="Likes">Likes</option>
        <option value="Comments">Comments</option>
        <option value="Posts">Posts</option>
      </select>

      <span className="filter-bar__count">{count} shown</span>
    </div>
  );
}

export default FilterBar;