import React from "react";
import { renderStarFromNumber, formatMoney } from "../ultils/helper";
import { Link } from "react-router-dom";
// import path from "../ultils/path";
const ProductsCard = ({productData}) => {
  
  return (
    <>
      <Link to={`/${productData?.category.toLowerCase()}/${productData?._id}/${productData?.title}`} className="w-1/3 flex-auto flex p-4 ">
        <img
          src={productData?.thumb || ""}
          alt="products"
          className="w-[40%] object-contain p-4"></img>
        <div className="flex flex-col items-start gap-1 w-full leading-10 ">
        
          <span className="line-clamp-1 font-semibold text-[20px] mt-4">
            {productData?.title}
          </span>
          <span className="flex h-4">{renderStarFromNumber(productData?.totalRatings)}</span>
          <span>{`${formatMoney(productData?.price)} VNĐ `}</span>
        </div>
      </Link>
    </>
  );
};

export default ProductsCard;
