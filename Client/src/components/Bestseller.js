import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../apis/products";
import {Product} from './'
import Slider from "react-slick";

const tabs = [
  { id: 1, name: "Best Seller" },
  { id: 2, name: "New Arrivals" },
  { id: 3, name: "Tablet" },
];
//Setting Slider
var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
};
const Bestseller = () => {
  const [activedTab, setActivedTab] = useState(1);

  const [tablet, setTablet] = useState(null);
  const [bestseller, setBestSeller] = useState(null);
  const [newproducts, setNewproducts] = useState(null);
  
  const [products, setProducts] = useState(null);
  const fectchProducts = async () => {
    const [bestSellerResponse, newProductsResponse, tabletResponse] = await Promise.all([
      apiGetProducts({ sort: "-sold" }),
      apiGetProducts({ sort: "createdAt" }),
      apiGetProducts({ sort: "brand" })
    ]);
    if (bestSellerResponse?.success) {
      setBestSeller(bestSellerResponse.products);
      setProducts(bestSellerResponse.products);
    }

    if (newProductsResponse?.success) {
      setNewproducts(newProductsResponse.products);
    }

    if (tabletResponse?.success) {
      setTablet(tabletResponse.products);
    }
    // if (response[0]?.success) {
    //   setBestSeller(response[0].products);
    //   setProducts(response[0].products)
    //   setTablet(response[0].products);
    // }
    // if (response[1]?.success) setNewproducts(response[1].products);
    // setProducts(response[0].products)

    // if (response[1]?.success) setTablet(response[1].products);
    // setTablet(response[0].products)
  };
  useEffect(() => {
    fectchProducts();
  }, []);
  useEffect(() => {
    if(activedTab === 1) setProducts(bestseller) 
    if(activedTab === 2) setProducts(newproducts) 
    if(activedTab === 3) setProducts(tablet) 
  }, [activedTab]);
  return (
    <div>
      <div className="flex text-[20px] gap-8 pb-4 mt-6 border-b-2 border-main">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold capitalize cursor-pointer ${
              activedTab === el.id ? "text-main" : ""
            }`}
            onClick={() => setActivedTab(el.id)}>
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px]">
        <Slider  {...settings}>
        {products?.map(el => (
                <Product
                key = {el.id}
                productData={el}
                />
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default Bestseller;
