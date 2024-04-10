import React,{useEffect , useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Breadcrumb,Product } from "../../components";
import { apiGetProducts } from "../../apis";
const Products = () => {
  const fetchProductsByCategory = async (queries) => {
    const response = await apiGetProducts(queries)
    console.log(response);
  }
  const { category } = useParams();
  useEffect(() => {
    fetchProductsByCategory()
  })
  console.log(category);
  return (
    <div className="w-full">
      <div className="h-[81px flex justify-center ">
        <div className="w-main">
          <span className="text-[19px] font-medium uppercase">{category}</span>
          <Breadcrumb category={category} />
        </div>
      </div>
      <div className="w-main border p-4 flex justify-between mt-8 m-auto">
        <div className="w-4/5 flex-auto">Filter</div>
        <div className="w-1/5 flex">Sort by</div>
      </div>
      <div className="w-full h-[500px]">

      </div>
    </div>
  );
};

export default Products;
