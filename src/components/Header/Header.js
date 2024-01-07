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
      <div className="mx-auto bigtablet:flex justify-between items-center grid grid-cols-{1fr_1fr}">
        <Link
          to={"/"}
          className="mb-[10px] bigtablet:mb-[0px] text-[18px] xl:text-2xl font-semibold col-start-1 col-end-3 justify-self-center"
        >
          E-Commerce Store
        </Link>
        <Search />
        <Link
          to="/cart"
          className="grid grid-cols-[1fr_1fr] bigtablet:grid-cols-[1fr_2fr] gap-2 text-white justify-self-end"
        >
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
