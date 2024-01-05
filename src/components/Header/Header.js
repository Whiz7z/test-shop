// Header.js
import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">E-Commerce Store</h1>
        <a href="/cart" className="text-white">
          Cart (0)
        </a>
      </div>
    </header>
  );
};

export default Header;
