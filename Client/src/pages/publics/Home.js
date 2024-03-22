import React from "react";
import { Banner, Sidebar, Bestseller,Dealdaily,TabletandIpad } from "../../components";

const Home = () => {
  return (
    <div className="w-full flex justify-center flex-col">
      <div className="w-[100%] justify-center flex flex-col">
        <div className="flex flex-col gap-5 w-[100%] flex-auto ">
          <Sidebar />
          
        </div>
        <div className="flex flex-col gap-5 w-[100%] flex-auto ">
          <Banner />
        </div>
        <div className="flex flex-col gap-5 w-[100%] flex-auto ">
        <Bestseller />
        <Dealdaily/>
        </div>
        <div className="flex flex-col gap-5 w-[100%] flex-auto ">
        <TabletandIpad />
        </div>
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Home;
