import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

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

  const { image, name, category, rating, description, price } = product;

  return (
    <div className="grid grid-cols-[1fr_2fr] items-center">
      <img src={image} alt={name} className="w-full h-auto mb-4" />
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="text-gray-500 mb-2">Category: {category}</p>
        <div className="flex items-center justify-center mb-2">
          <p className="text-yellow-500">Rating: {rating.rate}</p>
          <span className="mx-2">|</span>
          <p>{rating.count} reviews</p>
        </div>
        <p className="text-gray-700 mb-4">{description}</p>
        <p className="text-blue-600 font-bold text-2xl">${price}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
