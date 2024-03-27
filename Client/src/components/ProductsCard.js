import React from "react";
import { renderStarFromNumber, formatMoney } from "../ultils/helper";
import { Link } from "react-router-dom";
import path from "../ultils/path";
const ProductsCard = ({id, images, totalRatings, title, price}) => {
  console.log(id);
  return (
    <>
      <Link to={`/${path.DETAIL_PRODUCT}/${id}/${title}`} className="w-1/3 flex-auto flex p-4 ">
        <img
          src={images}
          alt="products"
          className="w-[40%] object-contain p-4"></img>
        <div className="flex flex-col items-start gap-1 w-full leading-10 ">
        
          <span className="line-clamp-1 font-semibold text-[20px] mt-4">
            {title}
          </span>
          <span className="flex h-4">{renderStarFromNumber(totalRatings)}</span>
          <span>{`${formatMoney(price)} VNĐ `}</span>
        </div>
      </Link>
    </>
  );
};

export default ProductsCard;
