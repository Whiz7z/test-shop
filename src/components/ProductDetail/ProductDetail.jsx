import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

import { useParams } from "react-router-dom";
import ProductAddedModal from "../../Modals/ProductAddedModal";

const ProductDetail = () => {
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const dispatch = useDispatch();

  const fetchProductDetails = useCallback(async () => {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);

    console.log(response.data);
    setProduct(response.data);
  }, [id]);

  useEffect(() => {
    fetchProductDetails();
  }, [id, fetchProductDetails]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const { image, title, category, rating, description, price } = product;

  const onAddToCart = (product) => {
    setOpenModal(true);
    dispatch(addToCart(product));
  };

  return (
    <>
      <div className="grid lg:grid-cols-[1fr_2fr] gap-4 items-center mt-[60px]">
        <img
          src={image}
          alt={title}
          className="h-[400px] lg:w-full lg:h-auto mb-4 justify-self-center"
        />
        <div className="grid h-full content-start text-start self-start gap-4 ">
          <div className="flex items-center justify-center mt-[120px]">
            <p className="text-yellow-500">Rating: {rating.rate}</p>
            <span className="mx-2">|</span>
            <p>{rating.count} reviews</p>
          </div>
          <h2 className="text-2xl font-bold ">{title}</h2>

          <p className="text-gray-500  text-[16px]">Category: {category}</p>

          <p className="text-gray-700  text-[16px]">{description}</p>
          <p className="text-blue-600 font-bold text-2xl">${price}</p>
          <button
            onClick={() => onAddToCart(product)}
            className="w-[180px] h-[40px] self-end justify-self-end transition-all duration-300 bg-transparent text-gray-800 px-4 py-2  border-2 border-gray-800  hover:bg-gray-800 hover:text-white"
          >
            Add to Cart
          </button>
        </div>
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

export default ProductDetail;
