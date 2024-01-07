// Sidebar.js
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setCategory } from "../../redux/productsSlice";
const Sidebar = ({ onResetPage }) => {
  const dispatch = useDispatch();
  const { categoryChoosen } = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    setCategories(response.data);
  };

  const onCategoryClick = (category) => {
    dispatch(setSearchQuery(""));
    dispatch(setCategory(category));
    onResetPage();
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="bg-gray-800 text-white p-4 max-h-[360px] sticky top-4 justify-self-start w-full">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul className="grid">
        <li
          className={`w-full p-4 hover:bg-slate-300 cursor-pointer hover:text-gray-800 
            transition-colors duration-300 text-[16px]
            ${categoryChoosen === "All" ? "bg-slate-300 text-gray-800" : ""}`}
          onClick={() => onCategoryClick("All")}
        >
          All
        </li>
        {categories.map((category) => (
          <li
            key={category}
            className={`w-full p-4 hover:bg-slate-300 cursor-pointer hover:text-gray-800 
            transition-colors duration-300 text-[16px]
            ${
              categoryChoosen === category ? "bg-slate-300 text-gray-800" : ""
            }`}
            onClick={() => onCategoryClick(category)}
          >
            {category.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
