import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  // Update the search query state
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Call the onSearch function from Userpage when search button is clicked
  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md shadow-md">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="w-full p-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-red-900 text-white rounded py-2 hover:bg-black"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
