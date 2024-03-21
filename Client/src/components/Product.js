import React,{useState} from "react";
import { formatMoney } from "../ultils/helper";
import label from "../assets/label.png";
import labelblue from "../assets/labelblue.png";
import {renderStarFromNumber} from '../ultils/helper'
import {Selectoption} from './'
import icons from "../ultils/icons";

const {
  FaEye,IoMenu,FaHeart
} = icons
const Product = ({ productData, isNew }) => {
  const [isShowOption, setIsShowOption] = useState(false)
  return (
    <div className="w-full px-[10px]  text-base">
      <div
       className="w-full flex flex-col items-center"
       onMouseEnter={e => {
        e.stopPropagation();
        setIsShowOption(true);
      }}
      onMouseLeave={e => {
        e.stopPropagation();
        setIsShowOption(false);
      }}
      >
        <div className="w-full relative flex justify-center">
          {isShowOption && <div 
          className='absolute flex bottom-[-20px] left-0 right-0 justify-center gap-2 animate-slide-top'
          >
                <Selectoption icon={<FaEye/>}/>
                <Selectoption icon={<IoMenu/>}/>
                <Selectoption icon={<FaHeart/>}/>
          </div>}
          <img
            src={productData?.thumb || ""}
            alt=""
            className="h-[303px] object-fill "></img>
          {/* <img
            src={isNew ? label : labelblue}
            alt=""
            className={`absolute w-[100px]  ${isNew ? 'w-[120px] top-[-20px] left-[-28px]' : ' w-[120px] top-[-20px] left-[-30px]'} object-cover`}></img> */}
           {/* <span className={`font-bold top-[0px] left-[5px] text-white absolute ${isNew ? '' : 'text-sm top-[6px] left-[-5px]'}`}>
              {isNew ? 'New' : 'Trending'}
            </span> */}
        </div>
        <div className="flex flex-col items-center gap-1 w-full leading-10">
          <span className="line-clamp-1 font-semibold text-[20px] mt-4">{productData?.title}</span>
          <span className="flex h-4">{renderStarFromNumber(productData?.totalRatings)}</span>
          <span>{`${formatMoney(productData?.price)} VNĐ `}</span>
        </div>
      </div>
    </div>
  );
};

// line-clamp la dau 3 cham khi qua dai
export default Product;
