import React from "react";

import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product?.id}`)}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 m-3 "
    >
      <div className="h-[13rem] w-[10rem]">
        <img
          className="object-cover object-top w-full h-full"
          src={product?.images[0]?.url || product?.thumbnail}
          alt={product?.title}
        />
      </div>

      <div className="p-5" style={{ height: 118, marginBottom: 5 }}>
        <h3 className="text-lg font-medium text-gray-900">
          {product?.brand || product?.name}
        </h3>
        <p className="mt-2 text-sm text-gray-500">${product?.price[0].value}</p>
      </div>
    </div>
  );
};

export default HomeProductCard;
