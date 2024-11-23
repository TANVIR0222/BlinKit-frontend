import { Search } from "lucide-react";
import React from "react";

const ProductSearch = ({ handleSearch, search, setSearch, loading }) => {
  return (
    <div className="">
      <form onSubmit={handleSearch}>
        <div className="flex items-center">
          <input
            className="h-9 bg-blue-50 md:w-96 w-52 outline-none border-[1px] rounded p-2 hover:border-black mr-3"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
          />
          <Search size={20} className="-ml-10" />
        </div>
        <button
          className="bg-secondary px-1 md:px-3 py-[6px] rounded hidden md:flex-row"
          type="submit"
        >
          Search
        </button>
      </form>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default ProductSearch;
