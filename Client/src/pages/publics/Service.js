import React from "react";
import { Breadcrumb } from "../../components";

const Service = ({category}) => {
  return (
    <div className="w-full justify-center items-center flex flex-col">
      <div className="h-[81px flex justify-center w-full">
        <div className="md:w-main w-auto mt-[50px] md:mt-5">
          <span className="text-[30px] font-medium uppercase">Service</span>
          <Breadcrumb category={category} />
        </div>
      </div>
      <div className="xl:w-main w-full flex-wrap flex mt-5">
        <div className="flex flex-wrap justify-center items-center">
          <div className="md:w-[40%] w-full">
            <img
              className="h-[250px] w-full object-cover"
              src="https://th.bing.com/th/id/OIP.GDH7bifW1-n_-n34o2ENFAHaFF?rs=1&pid=ImgDetMain"
              alt=""></img>
          </div>
          <div className="md:w-[60%] p-6 ">
            <span className="text-[15px]">
              Cras magna tellus, congue vitae congue vel, facilisis id risus.
              Proin semper in lectus id faucibus. Aenean vitae quam eget mi
              aliquam viverra quis quis velit. Curabitur mauris diam, posuere
              vitae nunc eget, blandit pellentesque mi. Pellentesque placerat
              nulla at ultricies malesuada. Aenean mi lacus, malesuada at leo
              vel, blandit iaculis nisl. Praesent vestibulum nisl sed diam
              euismod, a auctor neque porta. Vestibulum varius ligula non orci
              tincidunt rutrum. Suspendisse placerat enim eu est egestas,
              aliquam venenatis elit accumsan. Donec metus quam, posuere sit
              amet odio et, ultricies consequat nibh.
            </span>
          </div>
        </div>
        <div className="w-full text-center mt-7 mb-7">
          <span className="text-[25px] font-semibold">
            We Offer Best Services
          </span>
        </div>
        <div className="flex-wrap flex w-full justify-center gap-8 mb-8">
          <div className="w-[30%] flex flex-col text-center justify-center items-center">
            <img
              className="object-contain w-[20%] mb-3"
              src="https://cdn.shopify.com/s/files/1/1636/8779/files/settings.png?v=1491835711"
              alt=""></img>
            <span className="text-[16px]">Customizable Page</span>
            <span className="text-[13px]">Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</span>
          </div>
          <div className="w-[30%] flex flex-col text-center justify-center items-center">
            <img
              className="object-contain w-[20%] mb-3"
              src="https://cdn.shopify.com/s/files/1/1636/8779/files/picture.png?v=1491835656"
              alt=""></img>
            <span className="text-[16px]">Revolution Slider</span>
            <span className="text-[13px]">Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</span>
          </div>
          <div className="w-[30%] flex flex-col text-center justify-center items-center">
            <img
              className="object-contain w-[20%] mb-3"
              src="https://cdn.shopify.com/s/files/1/1636/8779/files/layout.png?v=1491835677"
              alt=""></img>
            <span className="text-[16px]">Drag & Drop Page</span>
            <span className="text-[13px]">Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</span>
          </div>
          <div className="w-[30%] flex flex-col text-center justify-center items-center">
            <img
              className="object-contain w-[20%] mb-3"
              src="https://cdn.shopify.com/s/files/1/1636/8779/files/picture.png?v=1491835656"
              alt=""></img>
            <span className="text-[16px]">Revolution Slider</span>
            <span className="text-[13px]">Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</span>
          </div>
          <div className="w-[30%] flex flex-col text-center justify-center items-center">
            <img
              className="object-contain w-[20%] mb-3"
              src="https://cdn.shopify.com/s/files/1/1636/8779/files/settings.png?v=1491835711"
              alt=""></img>
            <span className="text-[16px]">Customizable Page</span>
            <span className="text-[13px]">Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</span>
          </div>
          <div className="w-[30%] flex flex-col text-center justify-center items-center">
            <img
              className="object-contain w-[20%] mb-3"
              src="https://cdn.shopify.com/s/files/1/1636/8779/files/settings.png?v=1491835711"
              alt=""></img>
            <span className="text-[16px]">Customizable Page</span>
            <span className="text-[13px]">Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
