import React, { useState } from "react";
import { formatMoney } from "../../ultils/helper";
import { renderStarFromNumber } from "../../ultils/helper";
import { Selectoption } from "..";
import icons from "../../ultils/icons";
import { Link, useNavigate } from "react-router-dom";
import { apiupdatecart } from "../../apis";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent } from "../../store/user/asyncAction";
import Swal from "sweetalert2";
import path from "../../ultils/path";


const { FaEye, IoMenu, FaHeart } = icons;
const Product = ({ productData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowOption, setIsShowOption] = useState(false);
  const {current} = useSelector(state => state.user)
  const handleClickOptions = async (e, flag) => {
    e.stopPropagation()
    if(flag === 'CART'){
      if(!current) return Swal.fire({
        title: 'Almost',
        text: 'Please login first',
        icon: 'info',
        cancelButtonText: 'Not now!',
        showConfirmButton: true,
        confirmButtonText: 'Go to login page'
      }).then((rs) => {
          if (rs.isConfirmed) navigate(`/${path.LOGIN}`)
      })
      console.log(productData);
        const response =  await apiupdatecart({pid : productData._id , color : productData.color})
        if(response.success) {
          toast.success(response.mes)
          dispatch(getCurrent())
        }
        else toast.error(response.mes)
    }
  }
  return (
    <div className="w-full px-[10px] text-base">
      <div
        className="w-full flex flex-col items-center"
        
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}>
        <div className="w-full relative flex justify-center">
          {isShowOption && (
            <div className="absolute flex bottom-[-20px] left-0 right-0 justify-center gap-2 animate-slide-top">
              <Link to={`/${productData?.category.toLowerCase()}/${productData?._id}/${productData?.title}`} ><Selectoption icon={<FaEye />} /></Link>
              <span title="Add to cart" onClick={(e) => handleClickOptions(e, 'CART')}><Selectoption icon={<IoMenu />} /></span>
              <Selectoption icon={<FaHeart />} />
            </div>
          )}
          <img
            src={productData?.thumb || ""}
            alt=""
            className="h-[303px] object-contain "></img>
        </div>
        <div className="flex flex-col items-center gap-1 w-full leading-10">
          <span className="line-clamp-1 font-semibold text-[20px] mt-4">
            {productData?.title}
          </span>
          <span className="flex h-4">
            {renderStarFromNumber(productData?.totalRatings)}
          </span>
          <span>{`${formatMoney(productData?.price)} VNĐ `}</span>
        </div>
      </div>
    </div>
  );
};

// line-clamp la dau 3 cham khi qua dai
export default Product;
