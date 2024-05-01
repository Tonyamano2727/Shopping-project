import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Breadcrumb, Selectquantity } from "../../components";
import { formatMoney } from "../../ultils/helper";

const Detailcart = ({ category }) => {
  const { current } = useSelector((state) => state.user);
  const [quantity, setquantity] = useState(0)
  const handleQuantity = (number) => {
    if(+number > 1) setquantity(number)
   
 }
 const handlechangequantity = (flag) => {
  if(flag === 'minus' && quantity === 1 ) return
  if(flag === 'minus') setquantity(prev => +prev - 1)
  if(flag === 'Plus') setquantity(prev => +prev + 1)
}
 window.scrollTo(0 , 0)
  return (
    <div className="w-full justify-center items-center flex flex-col">
      <div className="h-[81px flex justify-center ">
        <div className="w-main">
          <h3 className="text-[30px] font-medium uppercase">My cart</h3>
          <Breadcrumb category={category} />
        </div>
      </div>
      <div className="font-bold w-main flex my-y border py-3">
        <span className="w-[50%] text-center">Product</span>
        <span className="w-[30%] text-center">Quantity</span>
        <span className="w-[20%] text-center">Price</span>
      </div>
      {current?.cart?.map((el) => (
        <div key={el._id} className="w-main flex my-y border py-3">
          <span className="w-[50%] flex">
            <div className="flex w-full items-center">
              <img
                src={el.product?.thumb}
                alt="thumb"
                className="w-28 h-28 object-cover"></img>
              <div className="flex flex-col">
              <div className="flex justify-between items-center w-full">
                <span className="font-bold">{el.product?.title}</span>
              </div>
              <span>Color : {el.color}</span>
              
              </div>
            </div>
          </span>
          <span className="w-[30%] text-center flex justify-center items-center">
            <div className="flex items-center justify-center">
            <Selectquantity quantity={quantity} handleQuantity={handleQuantity} handlechangequantity={handlechangequantity}/>
            </div>
          </span>
          <span className="text-center flex justify-center items-center w-[20%] font-medium">Price : {formatMoney(el.product?.price) + "VND"}</span>
        </div>
      ))}
    </div>
  );
};

export default Detailcart;
