import "./CartItem.css";
import React from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
} from "../../../redux/cartSlice";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";

const CartItem = ({ product }) => {
  const dispatch = new useDispatch();
  const { id, image, title, price, quantity } = product;

  const onIncreaseQuantity = (product) => {
    dispatch(addToCart(product));
  };

  const onDecreaseQuantity = (product) => {
    dispatch(decreaseQuantity(product));
  };

  const onRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="grid grid-cols-[60px_3fr_1fr] bigtablet:grid-cols-[150px_3fr_1fr] gap-4 justify-between items-center border-b py-2">
      <div className="bigtablet:w-[150px] bigtablet:h-[150px] w-[60px] h-[60px]">
        <img
          src={image}
          alt={title}
          className=" w-[150px] object-contain  h-full"
        />
      </div>
      <div>
        <Link
          to={`/product/${id}`}
          className="text-[12px] bigtablet:text-lg text-gray-500 font-bold hover:underline hover:text-blue-600"
        >
          {title}
        </Link>
        <p className="text-gray-500">${price} each</p>
      </div>
      <div className="grid items-center">
        <div className="grid grid-cols-[1fr_2fr_1fr] justify-items-center items-center">
          <span
            className="pointer w-[25px] h-[25px] bigtablet:w-[35px] bigtablet:h-[35px]"
            onClick={() => onDecreaseQuantity({ ...product })}
          >
            <FiMinusSquare />
          </span>
          <button
            onClick={() => onRemoveFromCart(id)}
            className="bg-red-500 text-white bigtablet:py-2 xl:px-5 bigtablet:px-3  p-1 bigtalet:p-2 rounded hover:bg-red-600"
          >
            Remove
          </button>

          <span
            className="pointer w-[25px] h-[25px] bigtablet:w-[35px] bigtablet:h-[35px]"
            onClick={() => onIncreaseQuantity({ ...product })}
          >
            <FiPlusSquare />
          </span>
        </div>
        <p className="justify-self-center text-blue-600 font-bold text-lg">
          {quantity}x
        </p>
      </div>
    </div>
  );
};

export default CartItem;
