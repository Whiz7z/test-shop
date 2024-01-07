import React, { useEffect } from "react";
import CartItem from "./CartItem/CartItem";
import { useSelector } from "react-redux";
import { BsMenuButtonFill } from "./../../../node_modules/react-icons/bs/index.esm";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, totalAmount } = useSelector((state) => state.cart);

  useEffect(() => {
    console.log(cart);
  }, [cart]);
  return (
    <div className="xl:w-[60%]">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <CartItem key={item.id} product={item} />
          ))}
          <div className="flex justify-between items-center mt-4">
            <p className="font-bold">Total: {totalAmount}</p>
            <Link
              to="/checkout"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              To checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
