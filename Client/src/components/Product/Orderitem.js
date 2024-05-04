import React, { useState , useEffect} from "react";
import { formatMoney } from "../../ultils/helper";
import Selectquantity from "../Detail/Selectquantity";
import { updateCart } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";

const Orderitem = ({ el , defaultquantity=1 }) => {
    const dispatch = useDispatch();
  const [quantity, setquantity] = useState(() => defaultquantity);
  const handlechangequantity = (flag) => {
    if (flag === "minus" && quantity === 1) return;
    if (flag === "minus") setquantity((prev) => +prev - 1);
    if (flag === "Plus") setquantity((prev) => +prev + 1);
  };
//   const { current } = useSelector((state) => state.user);

  const handleQuantity = (number) => {
    if (+number > 1) setquantity(number);
  };
  useEffect(() => {
    dispatch(updateCart({pid : el.product?._id , quantity , color : el.color , title : el.title }))
    
  },[quantity])

  return (
    <div className="w-main flex border py-3">
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
          <Selectquantity
            quantity={quantity}
            handleQuantity={handleQuantity}
            handlechangequantity={handlechangequantity}
          />
        </div>
      </span>
      <span className="text-center flex justify-center items-center w-[20%] font-medium">
        Price : {formatMoney(el.product?.price * quantity) + "VND"}
      </span>
    </div>
  );
};

export default Orderitem;
