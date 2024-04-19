import React from "react";
import icons from "../../ultils/icons";
const { MdOutlineEmail } = icons;
const Footer = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col w-full">
        <div className="h-[103px] w-full bg-main flex justify-center items-center">
          <div className="w-main flex items-center justify-between">
            <div className="flex-col flex flex-1">
              <span className="text-[20px] text-gray-100">
                SIGN UP TO NEWSLETTER
              </span>
              <small className="text-[13px] text-gray-300">
                Subscribe now and receive weekly newsletter
              </small>
            </div>
            <div className="flex-1 flex items-center">
              <input
                className="w-full p-3 rounded-l-full bg-[#e68989] outline-none text-gray-100 placeholder:text-sm placeholder:text-gray-200 placeholder:opacity-50"
                type="text"
                name=""
                id=""
                placeholder="Email address"></input>
              <div className="h-[48px] w-[49px] bg-[#e68989] rounded-r-full justify-center items-center text-white flex">
                <MdOutlineEmail size={25} />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[407px] w-full bg-gray-800 flex items-center justify-center text-white text-[13px]">
          <div className="w-main   flex">
            <div className="w-[35%] flex flex-col gap-3">
              <h3 className="mb-[20px] text-[15px] border-l-2 border-main p-l-[15px] font-semibold">
                ABOUT US
              </h3>
              <span>
                <span>Address: </span>
                <span className="opacity-70">
                  474 Ontario St Toronto, ON M4X 1M7 Canada
                </span>
              </span>
              <span>
                <span>Phone: </span>
                <span className="opacity-70">(+1234)56789xxx</span>
              </span>
              <span>
                <span>Mail:</span>
                <span className="opacity-70">tadathemes@gmail.com</span>
              </span>
            </div>
            <div className="w-[22%] flex flex-col gap-3">
              <h3 className="mb-[20px] text-[15px]  border-l-2 border-main p-l-[15px] font-semibold">
                INFORMATION
              </h3>
              <span>Typography</span>
              <span>Gallery</span>
              <span>Store Location</span>
              <span>Today's Deals</span>
              <span>Contact</span>
            </div>
            <div className="w-[22%] flex flex-col gap-3">
              <h3 className="mb-[20px] text-[15px]  border-l-2 border-main p-l-[15px] font-semibold">
                WHO WE ARE
              </h3>
              <span>Help</span>
              <span>Free Shipping</span>
              <span>FAQs</span>
              <span>Return & Exchange</span>
              <span>Testimonials</span>
            </div>
            <div className="w-[22%] flex flex-col gap-3">
              <h3 className="mb-[20px] text-[15px]  border-l-2 border-main p-l-[15px] font-semibold">
              #DIGITALWORLDSTORE
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
