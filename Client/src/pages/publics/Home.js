import React from "react";
import { Banner, Sidebar, Bestseller } from "../../components";

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
        <div className="flex flex-col gap-5 px-5 w-[100%] flex-auto ">
        <Bestseller />
        </div>
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Home;
