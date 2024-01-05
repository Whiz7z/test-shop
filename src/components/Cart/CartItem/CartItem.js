import React from "react";

const CartItem = ({ product }) => {
  const { id, image, title, price, quantity } = product;
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <img src={image} alt={title} width={150} height={150} />
      </div>
      <div>
        <p className="text-lg font-bold">{title}</p>
        <p className="text-gray-500">${price} each</p>
      </div>
      <div className="flex items-center">
        <div className="grid grid-cols-[1fr_3fr_1fr] justify-items-center items-center">
          <span>+</span>
          <button
            onClick={() => console.log(id)}
            className="bg-red-500 text-white  py-1 rounded hover:bg-red-600"
          >
            Remove
          </button>
          <span>-</span>
        </div>
        <p className="text-blue-600 font-bold">{quantity}x</p>
      </div>
    </div>
  );
};

export default CartItem;
