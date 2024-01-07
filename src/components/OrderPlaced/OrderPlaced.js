import React from "react";
import { Link } from "react-router-dom";

const OrderPlaced = () => {
  return (
    <div className="h-[80vh]  justify-center items-center grid ">
      <div className="grid grid-cols-1 justify-items-center gap-10">
        <h2 className="text-3xl font-bold text-center">
          Your order was successfully placed
        </h2>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to main page
        </Link>
      </div>
    </div>
  );
};

export default OrderPlaced;
