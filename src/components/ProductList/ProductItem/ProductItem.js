import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";

import "./ProductItem.css";
import ProductAddedModal from "./../../../Modals/ProductAddedModal";

const ProductItem = ({ product }) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { id, image, title, category, price } = product;

  const onAddToCart = (product) => {
    dispatch(addToCart(product));
    setOpenModal(true);
  };
  return (
    <>
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
      {openModal && (
        <ProductAddedModal wrapperId={"modal"}>
          <div className="top-0 absolute bg-[rgba(0,0,0,0.5)] w-[100%] h-[100%]">
            <div className="grid rounded w-[300px] h-[200px] top-[50%] bg-gray-900 absolute left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <h2 className="text-2xl text-white text-center mt-[40px]">
                Added to cart
              </h2>
              <button
                className="rounded bg-blue-600 text-white 
              hover:bg-blue-700 m-auto px-20 p-2 mt-[40px]"
                onClick={() => setOpenModal(false)}
              >
                Ok
              </button>
            </div>
          </div>
        </ProductAddedModal>
      )}
    </>
  );
};

export default ProductItem;
