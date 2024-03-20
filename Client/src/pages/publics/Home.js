import React, { useEffect, useState } from "react";
import { Banner, Sidebar, Bestseller } from "../../components";

const Home = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[100%] justify-center flex flex-col">
        <div className="flex flex-col gap-5 w-[100%] flex-auto ">
          <Sidebar />
          {/* <span>Deal daily</span> */}
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[100%] flex-auto ">
          <Banner />
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[100%] flex-auto ">
        <Bestseller />
        </div>
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Home;
