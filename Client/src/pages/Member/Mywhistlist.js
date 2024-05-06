import React, { useState } from "react";
import { Breadcrumb, Pagination, Product } from "../../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Mywhistlist = () => {
  const { current } = useSelector((state) => state.user);
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col w-main">
        <div className="mt-5 mb-5">
          <h3 className="text-[30px] font-medium uppercase">My cart</h3>
          <Breadcrumb />
        </div>
        <div className="w-full flex flex-wrap gap-4">
          {current?.wishlist?.map((el) => (
            <div className="flex w-[24%]">
              <Product key={el.id} pid={el._id} productData={el} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mywhistlist;
