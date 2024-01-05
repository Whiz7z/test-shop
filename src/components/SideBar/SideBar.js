// Sidebar.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    setCategories(response.data);
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="bg-gray-800 text-white p-4 max-h-[300px] sticky top-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul className="grid">
        {categories.map((category) => (
          <li
            key={category}
            className="w-full p-4 hover:bg-slate-300 cursor-pointer hover:text-gray-800 transition-colors duration-300 text-[16px]"
            onClick={() => console.log(category)}
          >
            {category.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
