import React, { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Breadcrumb, Product, Search } from "../../components";
import { apiGetProducts } from "../../apis";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const [products, setproducts] = useState(null);

  const [activedclick, setactivedclick] = useState(null)

  const fetchProductsByCategory = async (queries) => {
    const response = await apiGetProducts(queries);
    if (response.success) setproducts(response.products);
  };
  const { category } = useParams();
  useEffect(() => {
    fetchProductsByCategory();
  },[]);

  const ChangeActiveFilter = useCallback((name) => {
    if(activedclick === name)setactivedclick(null)
    else setactivedclick(name)
  },[activedclick]
  )
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
        <div className="w-4/5 flex-auto flex flex-col gap-3">
          <span className="font-semibold text-sm">Filter by</span>
          <div className="flex items-center gap-4">
            <Search name="price" 
            activedclick = {activedclick}
            ChangeActiveFilter={ChangeActiveFilter}
            type='input'
            />
            <Search name="color" 
            activedclick = {activedclick}
            ChangeActiveFilter={ChangeActiveFilter}
            />
          </div>
        </div>
        <div className="w-1/5 flex">Sort by</div>
      </div>
      <div className="mt-8 w-main m-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {products?.map((el) => (
            <Product key={el._id} pid={el.id} productData={el} />
          ))}
        </Masonry>
      </div>
      
    </div>
  );
};

export default Products;
