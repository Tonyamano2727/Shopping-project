import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../../apis/products";
import Product from "../Product/Product";
import Slider from "react-slick";

const tabs = [
  { id: 1, name: "Tablet" },
  { id: 2, name: "Laptop" },
];
var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
};
const TabletandIpad = () => {
    const [activedTab, setActivedTab] = useState(1);
    const [tablet, setTablet] = useState(null);
    const [laptop, setLaptop] = useState(null);
    const [products, setProducts] = useState(null);
    const fectchProducts = async () => {
      const [laptopResponse, tabletResponse] =
        await Promise.all([
        apiGetProducts({ sort: "category",category: "Tablet"}),
          apiGetProducts({ sort: "category", category: "Laptop" }),
        ]);
      if (laptopResponse?.success) {
        setLaptop(laptopResponse.products);
        setProducts(laptopResponse.products);
      }
      if (tabletResponse?.success) {
        setTablet(tabletResponse.products);
      }
    };
    useEffect(() => {
      fectchProducts();
    }, []);
    useEffect(() => {
      if (activedTab === 1) setProducts(laptop);
      if (activedTab === 2) setProducts(tablet);
    }, [activedTab,laptop, tablet]);
  return (
    <>
      <div>
        <div className="flex text-[25px] gap-8  mt-[50px] mb-[50px] ml-[80px]">
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
        <div className="w-full pb-8">
          <div className="w-[100%]">
            <div className="mt-4">
              <Slider {...settings}>
                {products?.map((el) => (
                  <Product
                    key={el.id}
                    pid={el.id}
                    productData={el}
                    isNew={activedTab === 1 ? false : true}
                  />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabletandIpad;


