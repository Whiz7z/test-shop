import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  fetchProducts,
  setCategory,
} from "../../redux/productsSlice";
import { BsMenuButtonFill } from "./../../../node_modules/react-icons/bs/index.esm";

const Search = () => {
  const { searchQuery } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(fetchProducts());
    dispatch(setCategory("All"));
    dispatch(setSearchQuery(searchTerm.trim().toLowerCase()));
  };

  const onClearSearch = () => {
    setSearchTerm("");
    dispatch(setSearchQuery(""));
  };

  useEffect(() => {
    if (searchQuery === "") {
      setSearchTerm(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div className="flex items-center text-black">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-[300px] px-2 py-2 border border-gray-300  focus:outline-none border-none"
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Search
      </button>
      <button
        onClick={onClearSearch}
        className="ml-2 px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
      >
        Clear
      </button>
    </div>
  );
};

export default Search;
