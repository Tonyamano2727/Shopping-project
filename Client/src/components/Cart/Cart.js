import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Showcart } from "../../store/app/appslice";
const Cart = () => {
  const dispatch = useDispatch();
  const {current} = useSelector(state => state.user)
  console.log(current);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[30%] h-screen overflow-y-auto bg-black text-white p-6">
      <header className="py-4 border-b font-bold flex justify-between items-center text-2xl">
        <span>Your Cart</span>
        <span
          onClick={() => dispatch(Showcart())}
          className="cursor-pointer p-2">
          <IoIosCloseCircle size={50} />
        </span>
      </header>
      <section className="h-auto">
        {!current.cart && <span className="text-xs italic">Your cart is emty</span>}
        {current?.cart  && current?.cart.map(el => (
            <div key={el._id} className="">
                {el.product}
            </div>
        ))}
      </section>
      <section className="h-auto">Checkout</section>
    </div>
  );
};

export default Cart;
