import React from "react";
import { Breadcrumb, Pagination, Product } from "../../components";
import { useSelector } from "react-redux";

const Mywhistlist = ({ category }) => {
  const { current } = useSelector((state) => state.user);
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col w-main">
        <div className="mt-5 mb-5">
          <h3 className="text-[30px] font-medium uppercase">My Wishlist</h3>
          <Breadcrumb category={ category }/>
        </div>
        <div className="w-full flex flex-wrap gap-4">
          {current?.wishlist?.map((el) => (
            <div className="flex w-[45%] md:w-[30%] lg:w-[22%] xl:w-[24%]">
              <Product key={el.id} pid={el._id} productData={el} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mywhistlist;
