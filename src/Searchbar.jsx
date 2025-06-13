import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ placeholder = "Search...", onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center border rounded-2xl shadow-sm px-4 py-2 bg-white w-64">
      <Search className="text-gray-500 mr-2" />
      <input
        type="text"
        className="w-full outline-none text-base"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchBar;
