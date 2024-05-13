import React from "react";
import { Breadcrumb } from "../../components";

const Blogs = ({ category }) => {
  window.scrollTo(0, 0);
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="h-[81px flex justify-center w-full">
        <div className="md:w-main w-auto mt-[50px] md:mt-5 ">
          <span className="text-[30px] font-medium uppercase">BLOGS</span>
          <Breadcrumb category={category} />
        </div>
      </div>
      <div className="w-full xl:w-main flex justify-center mt-5 flex-wrap mb-10">
        <div className="xl:w-[77%] w-full">
          <div className="w-[100%]">
            <div className="">
              <div className=" text-[15px] flex-wrap flex">
                <div className="w-full flex flex-wrap justify-center items-center text-center xl:text-start  xl:w-full">
                  <div className="md:w-[60%] xl:w-[45%]">
                    <img
                      className="h-[250px] w-full object-cover"
                      src="https://th.bing.com/th/id/OIP.GDH7bifW1-n_-n34o2ENFAHaFF?rs=1&pid=ImgDetMain"
                      alt=""></img>
                  </div>
                  <div className="xl:w-[50%] w-[100%] md:w-[100%] flex  flex-col xl:ml-5 text-center xl:text-start  justify-center items-center">
                    <div className="w-[100%] xl:w-[80%] mt-2 text-[15px] font-semibold">
                      These are the 5 best phones you can buy right now
                    </div>
                    <div className="mt-2 w-[100%] xl:w-[80%]">
                      <span className="">December 13, 2016</span>
                      <span className="px-2">Comment</span>
                    </div>
                    <span className="text-[13px] mt-2 w-[90%] xl:w-[80%] xl:text-start">
                      Shoe street style leather tote oversized sweatshirt A.P.C.
                      Prada Saffiano crop slipper denim shorts spearmint. Braid
                      skirt round sunglasses seam leather vintage Levi plaited.
                      Flats holographic Acne grunge collarless denim chunky sole
                      cuff tucked t-shirt strong eyebrows. Clutch center part
                      dress dungaree slip dress. Skinny jeans knitwear minimal
                      tortoise-shell sunglasses...
                    </span>
                  </div>
                </div>
              </div>
              <div className=" text-[15px] flex-wrap flex mt-5">
                <div className="w-full flex flex-wrap justify-center items-center text-center xl:text-start  xl:w-full">
                  <div className="md:w-[60%] xl:w-[45%]">
                    <img
                      className="h-[250px] w-full object-cover"
                      src="https://th.bing.com/th/id/OIP.aQJroiLQdvsMOTuCD9gZwAHaFj?w=1600&h=1200&rs=1&pid=ImgDetMain"
                      alt=""></img>
                  </div>
                  <div className="xl:w-[50%] w-[100%] md:w-[100%] flex  flex-col xl:ml-5 text-center xl:text-start  justify-center items-center">
                    <div className="w-[100%] xl:w-[80%] mt-2 text-[15px] font-semibold">
                      These are the 5 best phones you can buy right now
                    </div>
                    <div className="mt-2 w-[100%] xl:w-[80%]">
                      <span className="">December 13, 2016</span>
                      <span className="px-2">Comment</span>
                    </div>
                    <span className="text-[13px] mt-2 w-[90%] xl:w-[80%] xl:text-start">
                      Shoe street style leather tote oversized sweatshirt A.P.C.
                      Prada Saffiano crop slipper denim shorts spearmint. Braid
                      skirt round sunglasses seam leather vintage Levi plaited.
                      Flats holographic Acne grunge collarless denim chunky sole
                      cuff tucked t-shirt strong eyebrows. Clutch center part
                      dress dungaree slip dress. Skinny jeans knitwear minimal
                      tortoise-shell sunglasses...
                    </span>
                  </div>
                </div>
              </div>

              <div className=" text-[15px] flex-wrap flex mt-5">
                <div className="w-full flex flex-wrap justify-center items-center text-center xl:text-start  xl:w-full">
                  <div className="md:w-[60%] xl:w-[45%]">
                    <img
                      className="h-[250px] w-full object-cover"
                      src="https://www.usinenouvelle.com/mediatheque/2/2/6/001218622_896x598_c.jpg"
                      alt=""></img>
                  </div>
                  <div className="xl:w-[50%] w-[100%] md:w-[100%] flex  flex-col xl:ml-5 text-center xl:text-start  justify-center items-center">
                    <div className="w-[100%] xl:w-[80%] mt-2 text-[15px] font-semibold">
                      These are the 5 best phones you can buy right now
                    </div>
                    <div className="mt-2 w-[100%] xl:w-[80%]">
                      <span className="">December 13, 2016</span>
                      <span className="px-2">Comment</span>
                    </div>
                    <span className="text-[13px] mt-2 w-[90%] xl:w-[80%] xl:text-start">
                      Shoe street style leather tote oversized sweatshirt A.P.C.
                      Prada Saffiano crop slipper denim shorts spearmint. Braid
                      skirt round sunglasses seam leather vintage Levi plaited.
                      Flats holographic Acne grunge collarless denim chunky sole
                      cuff tucked t-shirt strong eyebrows. Clutch center part
                      dress dungaree slip dress. Skinny jeans knitwear minimal
                      tortoise-shell sunglasses...
                    </span>
                  </div>
                </div>
              </div>

              <div className=" text-[15px] flex-wrap flex mt-5">
                <div className="w-full flex flex-wrap justify-center items-center text-center xl:text-start  xl:w-full">
                  <div className="md:w-[60%] xl:w-[45%]">
                    <img
                      className="h-[250px] w-full object-cover"
                      src="https://images.hindustantimes.com/tech/img/2023/09/12/1600x900/iPhone_15_Pro_1694541536304_1694541571648.jpeg"
                      alt=""></img>
                  </div>
                  <div className="xl:w-[50%] w-[100%] md:w-[100%] flex  flex-col xl:ml-5 text-center xl:text-start  justify-center items-center">
                    <div className="w-[100%] xl:w-[80%] mt-2 text-[15px] font-semibold">
                      These are the 5 best phones you can buy right now
                    </div>
                    <div className="mt-2 w-[100%] xl:w-[80%]">
                      <span className="">December 13, 2016</span>
                      <span className="px-2">Comment</span>
                    </div>
                    <span className="text-[13px] mt-2 w-[90%] xl:w-[80%] xl:text-start">
                      Shoe street style leather tote oversized sweatshirt A.P.C.
                      Prada Saffiano crop slipper denim shorts spearmint. Braid
                      skirt round sunglasses seam leather vintage Levi plaited.
                      Flats holographic Acne grunge collarless denim chunky sole
                      cuff tucked t-shirt strong eyebrows. Clutch center part
                      dress dungaree slip dress. Skinny jeans knitwear minimal
                      tortoise-shell sunglasses...
                    </span>
                  </div>
                </div>
              </div>
              
              
            </div>
          </div>
        </div>
        <div className="xl:w-[23%] border h-[380px] w-full mt-3 xl:mt-0">
          <div className="bg-main p-3 ">
            <span className="font-semibold text-white">RECENT ARTICLES</span>
          </div>
          <div className="flex flex-col p-3">
            <span className="text-[14px]">
              The standard Lorem Ipsum passage, used since the 1500s
            </span>
            <span className="text-[13px] mt-2 text-pink-600">Apr 14, 2017</span>
          </div>
          <div className="flex flex-col p-3">
            <span className="text-[14px]">
              Section 1.10.33 of de Finibus Bonorum et Malorum, written by
              Cicero in 45 BC
            </span>
            <span className="text-[13px] mt-2 text-pink-600">Apr 14, 2017</span>
          </div>
          <div className="flex flex-col p-3">
            <span className="text-[14px]">
              Quisque porta felis est ut malesuada lorem dignissim
            </span>
            <span className="text-[13px] mt-2 text-pink-600">Apr 14, 2017</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
