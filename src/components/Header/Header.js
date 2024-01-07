// Header.js
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PiBasket } from "react-icons/pi";
import Search from "../Search/Search";

const Header = () => {
  const quantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <header className="bg-gray-800 text-white p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"} className="text-2xl font-semibold">
          E-Commerce Store
        </Link>
        <Search />
        <Link to="/cart" className="grid grid-cols-[1fr_2fr] gap-2 text-white">
          <span>
            <PiBasket className="w-[35px] h-[35px]" />
          </span>
          <span className="text-2xl">{quantity}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
