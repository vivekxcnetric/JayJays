import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PDPPageSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5" duration={1.5}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-16 animate-pulse ">
        {/* Image Section */}
        <div className="flex justify-center">
          <Skeleton height={500} width={400} borderRadius={8} />
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-4">
          {/* Product Title */}
          <Skeleton height={40} width="70%" borderRadius={4} />

          {/* Product Price */}
          <Skeleton height={30} width="20%" borderRadius={4} />

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 mt-4">
            <Skeleton height={20} width={20} circle={true} />
            <Skeleton height={20} width={20} circle={true} />
            <Skeleton height={20} width={20} circle={true} />
            <Skeleton height={20} width={20} circle={true} />
            <Skeleton height={20} width={20} circle={true} />
            <Skeleton height={20} width={60} borderRadius={4} />
            <Skeleton height={20} width={40} borderRadius={4} />
          </div>

          {/* Size */}
          <div className="flex items-center gap-2 mt-4">
            <Skeleton height={20} width={30} borderRadius={4} />
            <Skeleton height={40} width={100} borderRadius={4} />
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-2 mt-4">
            <Skeleton height={20} width={30} borderRadius={4} />
            <div className="flex items-center gap-1">
              <Skeleton height={40} width={40} circle={true} />
              <Skeleton height={40} width={40} />
              <Skeleton height={40} width={40} circle={true} />
            </div>
          </div>

          {/* Add to Cart Button */}
          <Skeleton height={50} width="40%" borderRadius={25} />

          {/* Highlights */}
          <div className="mt-4 space-y-2">
            <Skeleton height={20} width="60%" borderRadius={4} />
            <Skeleton height={20} width="80%" borderRadius={4} />
            <Skeleton height={20} width="75%" borderRadius={4} />
            <Skeleton height={20} width="70%" borderRadius={4} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default PDPPageSkeleton;
