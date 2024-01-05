import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Cart from "./components/Cart/Cart";
import OrderForm from "./components/OrderForm/OrderForm";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/productsSlice";
import { useEffect } from "react";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="grid w-full text-black p-4 text-[11px] justify-items-center">
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} exact />
        <Route path="/product/:id" element={<ProductDetail />} exact />
        <Route path="/cart" element={<Cart />} exact />
        <Route path="/checkout" element={<OrderForm />} exact />
      </Routes>
    </div>
  );
}

export default App;
