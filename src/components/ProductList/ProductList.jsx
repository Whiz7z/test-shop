// ProductList.js
import React, { useState } from "react";
import ProductItem from "./ProductItem/ProductItem";
import Sidebar from "../SideBar/SideBar";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productsSlice";
import { useEffect } from "react";

const ProductList = () => {
  let currentProducts = [];
  let filteredProducts = [];
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  const dispatch = useDispatch();

  const {
    data: products,
    status,
    searchQuery,
    categoryChoosen,
  } = useSelector((state) => state.products);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetPageHandler = () => {
    setCurrentPage(1);
  };

  if (
    status === "succeeded" &&
    searchQuery === "" &&
    categoryChoosen === "All"
  ) {
    filteredProducts = products;
    console.log("1", filteredProducts);
    currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  } else if (
    status === "succeeded" &&
    searchQuery !== "" &&
    categoryChoosen === "All"
  ) {
    filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery)
    );
    console.log("2", filteredProducts);

    currentProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
  } else if (
    status === "succeeded" &&
    searchQuery === "" &&
    categoryChoosen !== "All"
  ) {
    filteredProducts = products.filter(
      (product) => product.category === categoryChoosen
    );
    console.log("3", filteredProducts);
    currentProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
  } else if (
    status === "succeeded" &&
    searchQuery !== "" &&
    categoryChoosen !== "All"
  ) {
    filteredProducts = products.filter(
      (product) =>
        product.category === categoryChoosen &&
        product.title.toLowerCase().includes(searchQuery)
    );
    console.log("4", filteredProducts);
    currentProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
  }

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="grid gap-4 grid-cols-[1fr] lg:grid-cols-[240px_1fr] grid-cols-xl-[240px_1fr_200px]  mt-4 w-full">
      <Sidebar onResetPage={resetPageHandler} />
      <div className="grid max-w-[1000px]  justify-self-center">
        <div
          className=" grid grid-cols-1 lg:grid-cols-2 
        xl:grid-cols-3 gap-4 "
        >
          {currentProducts &&
            currentProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
        </div>
        <div className="flex justify-center mt-4">
          {status === "succeeded" &&
            currentProducts &&
            Array.from(
              {
                length:
                  currentProducts.length !== 0
                    ? Math.ceil(filteredProducts.length / productsPerPage)
                    : Math.ceil(filteredProducts.length / productsPerPage),
              },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`w-[40px] h-[35px] mx-2 px-4 py-2 border duration-300 hover:bg-gray-700 hover:text-white ${
                    currentPage === index + 1
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
