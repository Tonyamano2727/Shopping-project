import React, { useEffect, useState } from "react";
import { ProductsCard } from "./";
import { apiGetProducts } from "../apis/products";
const Featureproducts = () => {
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const responese = await apiGetProducts({
      limit: 9,
      totalRatings: 4
    });
    if (responese.success) setProducts(responese.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <div  className="w-full">
        <h3 className=" font-semibold text-[25px] gap-8  mt-[10px] mb-[50px] ml-[60px] ">
          FEATURE PRODUCTS
        </h3>
        <div className="flex flex-wrap mt-[15px] ">
          {products?.map((el) => (
            <ProductsCard
              // key={el.id}
              id={el._id}
              images={el.thumb}
              title={el.title}
              totalRatings={el.totalRatings}
              price={el.price}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Featureproducts;
