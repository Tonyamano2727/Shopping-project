import React from "react";
import { formatMoney } from "../ultils/helper";
import label from '../assets/label.png'
const Product = ({ productData }) => {
  return (
    <div className="w-full px-[10px]  text-base">
      <div className="w-full border p-[15px] flex flex-col items-center">
        <div className="w-full relative flex justify-center">
          <img
            src={productData?.thumb || ""}
            alt=""
            className="w-[243px] h-[243px] object-cover"></img>
          <img src={label} alt="" className="absolute top-[-15px] left-[-38px] w-[100px] h-[35px] object-cover"></img>
          <span className='font-bold top-[-15px] left-[-12px] text-white absolute'> New </span>
        </div>
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full ">
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VNĐ `}</span>
        </div>
      </div>
    </div>
  );
};

// line-clamp la dau 3 cham khi qua dai
export default Product;
