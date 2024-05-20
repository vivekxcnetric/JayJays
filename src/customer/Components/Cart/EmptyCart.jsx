import React from "react";
import { IoCartOutline } from "react-icons/io5";
const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      {/* <svg
        className="w-16 h-16 text-gray-400 mb-4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M13 2L2 13m0 0l11 11M2 13h20"></path>
      </svg> */}
      <IoCartOutline size="64px" className="text-gray-400 mb-4" />
      <p className="text-gray-600 text-lg font-medium">Your cart is empty</p>
    </div>
  );
};

export default EmptyCart;
