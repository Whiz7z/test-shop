import React from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";

import "./ProductItem.css";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const { id, image, title, category, price } = product;

  const onAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="grid ">
      <Link
        to={`product/${id}`}
        className="grid  p-4 h-[460px]  border-2 border-gray-800"
      >
        <div
          className="image-container mb-2 popupOnHover justify-self-center"
          style={{ height: "300px", overflow: "hidden" }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full thumbnail m-auto"
          />
        </div>

        <p
          title={title}
          className="transition-all duration-300 text-lg font-semibold text-gray-500 hover:decoration-gray-500 hover:underline"
        >
          {title.substring(0, 40) + "..."}
        </p>
        <p className="text-gray-500 mb-2">{category}</p>
        <p className="text-blue-600 font-bold">${price}</p>
      </Link>
      <button
        onClick={() => onAddToCart({ ...product })}
        className="transition-all duration-300 bg-transparent text-gray-800 px-4 py-2 border-t-0 border-2 border-gray-800  hover:bg-gray-800 hover:text-white"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
