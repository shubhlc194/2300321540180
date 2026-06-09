function FilterBar({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <input
        type="text"
        placeholder="Search notifications..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="border p-2 rounded w-full mb-3"
      />

      <select
        value={selectedType}
        onChange={(e) =>
          setSelectedType(e.target.value)
        }
        className="border p-2 rounded w-full"
      >
        <option value="">
          All Types
        </option>
        <option value="Likes">
          Likes
        </option>
        <option value="Comments">
          Comments
        </option>
        <option value="Posts">
          Posts
        </option>
      </select>
    </div>
  );
}

export default FilterBar;