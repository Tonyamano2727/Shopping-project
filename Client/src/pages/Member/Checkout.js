import React from "react";
import payment from "../../assets/payment.svg";
import { useSelector } from "react-redux";
import { formatMoney } from "../../ultils/helper";
import { Paypal } from "../../components";

const Checkout = () => {
  const { currentCart } = useSelector((state) => state.user);
  console.log(currentCart);
  return (
    <div className="flex justify-center">
      <div className="max-auto p-8 w-full gap-6 flex ">
        <div className="w-[40%] flex  justify-center">
          <img
            src={payment}
            alt="payment"
            className="h-[70%] object-contain"></img>
        </div>
        <div className="w-[60%] flex flex-col">
          <h2 className="text-2xl font-bold text-center mb-10">
            Checkout your order
          </h2>
          <table className="table-auto w-full mb-10">
            <thead>
              <tr className="border bg-gray-200">
                <th className="text-left p-2">Products</th>
                <th className="text-center p-2">Quantity</th>
                <th className="text-right p-2">Prices</th>
              </tr>
            </thead>
            <tbody>
              {currentCart?.map((el) => (
                <tr key={el._id} className="border">
                  <td className="text-left p-2">{el.product?.title}</td>
                  <td className=" text-center p-2">{el.quantity}</td>
                  <td className=" text-right p-2">
                    {formatMoney(el.product?.price) + "  VND" }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center mt-4 justify-between pt-4 border-t border-black">
            <span>Subtotal : </span>
            <span className="text-red-500 font-bold">
              {formatMoney(
                currentCart?.reduce(
                  (sum, el) => sum + Number(el.product?.price) * el.quantity,
                  0
                )
              ) + "VND"}
            </span>
          </div>
          <div className="">adress</div>
          <div className="w-full flex justify-center">
            <Paypal amount={120} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
