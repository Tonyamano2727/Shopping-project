import React from "react";
import {
  Banner,
  Dealdaily,
  TabletandIpad,
  Featureproducts,Blog,
} from "../../components";
import Bestseller from "../../components/Tabproducts/Bestseller";
const Home = () => {
  
  return (
    <div className="w-full flex justify-center flex-col p-[20px]">
      <div className="w-[100%] justify-center flex flex-col">
        <div className="flex flex-col gap-5 w-[100%] flex-auto ">
          <Banner />
        </div>
        <div className="flex flex-col gap-5 w-[100%] flex-auto ">
          <Bestseller />
          <Dealdaily />
        </div>
        <div className="flex flex-col gap-5 w-[100%] flex-auto ">
          <TabletandIpad />
        </div>
      </div>
      <div className='my-8'>
        <Featureproducts/>
      </div>
      <div className='my-8'>
        <Blog/>
      </div>
    </div>
  );
};

export default Home;
