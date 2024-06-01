import React from "react";
import { useSelector } from "react-redux";
import { Breadcrumb, Button, Orderitem } from "../../components";
import { formatMoney } from "../../ultils/helper";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";

const Detailcart = ({ category }) => {
  const navigate = useNavigate();
  const { currentCart } = useSelector((state) => state.user);
  return (
    <div className="w-full justify-center items-center flex flex-col">
      <div className="h-[81px flex justify-center ">
        <div className="w-main">
          <h3 className="text-[30px] font-medium uppercase">My cart</h3>
          <Breadcrumb category={category} />
        </div>
      </div>
      <div className="flex flex-col border my-2">
        <div className="font-bold w-main bg-red-400 text-white flex  border py-3">
          <span className="w-[50%] text-center">Product</span>
          <span className="w-[30%] text-center">Quantity</span>
          <span className="w-[20%] text-center">Price</span>
        </div>
        {currentCart?.map((el) => (
          <Orderitem el={el} key={el._id} defaultquantity={el.quantity} />
        ))}
      </div>
      <div className="w-main mx-auto justify-end flex flex-col items-end gap-3 my-8">
        <span className="flex items-center gap-8 text-[20px] font-bold">
          <span>Subtotal:</span>
          <span className="">
            {formatMoney(
              currentCart?.reduce(
                (sum, el) => sum + Number(el.product?.price * el.quantity),
                0
              )
            ) + "VND"}
          </span>
        </span>
        <span className="">
          {" "}
          Shipping , taxes , and discounts calculated at checkout
        </span>
        <div>
          <Button
            handleOnclick={() => {
              navigate(`/${path.CHECK_OUT}`);
            }}>
            Check out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Detailcart;
