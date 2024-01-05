import React from "react";
import CartItem from "./CartItem/CartItem";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  return (
    <div className="w-[60%]">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.id} product={item} />
          ))}
          <div className="flex justify-between items-center mt-4">
            <p className="font-bold">Total:</p>
            {/* <p className="text-blue-600 font-bold">${calculateTotalPrice()}</p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
