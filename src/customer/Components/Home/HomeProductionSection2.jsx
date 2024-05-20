import React from "react";
import HomeProductCard from "./HomeProductCard";

const HomeProductSection = ({ x, content1, content2 }) => {
  const items = x?.slice(0, 5).map((item) => (
    <div className="flex-shrink-0">
      <HomeProductCard product={item} />
    </div>
  ));

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-extrabold text-gray-900 pt-5 text-center">
        {content1}
      </h2>
      <p className="text-xl font-bold text-gray-900 pb-5 text-center">
        {content2}
      </p>
      <div className="flex overflow-x-auto">{items}</div>
    </div>
  );
};

export default HomeProductSection;
