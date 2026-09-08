import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
}) => {
  return (
    <div className="relative">

      <Search className="absolute left-3 top-3 text-gray-500" size={20} />

      <input
        value={value}
        onChange={onChange}
        placeholder="Search products..."
        className="w-full pl-10 pr-4 py-3 rounded-lg border"
      />

    </div>
  );
};

export default SearchBar;