// ProductList.js
import React from "react";
import ProductItem from "./ProductItem/ProductItem";
import Sidebar from "../SideBar/SideBar";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productsSlice";
import { useEffect } from "react";

const ProductList = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.data);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="grid gap-4 grid-cols-[220px_1fr]  mt-4">
      <Sidebar />
      <div className="w-[100%] justify-self-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products &&
          products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductList;
