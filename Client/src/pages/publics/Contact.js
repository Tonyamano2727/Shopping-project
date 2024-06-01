import React from "react";
import icons from "../../ultils/icons";
import { Breadcrumb } from "../../components";

const { FaStreetView, FaCheck, IoMdMail, MdOutlinePhoneIphone } = icons;

const FQA = ({ category }) => {
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className="h-[81px flex justify-center w-full">
        <div className="md:w-main w-auto mt-[50px] md:mt-5">
          <span className="text-[30px] font-medium uppercase">contact</span>
          <Breadcrumb category={category} />
        </div>
      </div>
      <div className="mt-5 w-full lg:w-main">
        We would like to express our deep gratitude to you for taking the time
        and care to contact us. Your feedback and feedback play an important
        role in improving and developing our services. Here, we are not merely a
        service, but a community where every input is appreciated. Therefore, we
        appreciate all comments from you, and are committed to always listening
        and responding in the fastest way. If you have any questions, comments
        or y.
      </div>
      <div className="w-full mt-7 lg:w-main">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.8822852829935!2d106.72129207488094!3d10.666244189475902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31753b1ab9920ac9%3A0x553467c5b9e9a1f4!2zTMOyIFLGsOG7o3UgTmfhu41jIFPGsMahbmcgLSBMb25nIFRo4bubaSAtIE5ow6AgQsOo!5e0!3m2!1svi!2s!4v1713126435728!5m2!1svi!2s"
          className="w-full h-[500px]"
          style={{ border: "0" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Google Maps location of Lữ Gia Nông Sản Phẩm - Long Thành - Nhà Bè"></iframe>
      </div>
      <div className="w-full lg:w-main flex leading-7 text-[15px] flex-wrap">
        <div className="w-[100%] xl:w-[50%] flex justify-center flex-col text-[13px]">
          <div className="flex">
            <span className="flex items-center gap-2">
              <FaStreetView />
              Address :{" "}
            </span>
            <span className="flex items-center ml-2">
              474 Ontario St Toronto, ON M4X 1M7 Canada
            </span>
          </div>
          <div className="flex">
            <span className="flex items-center gap-2">
              <FaCheck /> Opening hours :{" "}
            </span>
            <span className="flex items-center ml-2">
              Every day just off chu nhat
            </span>
          </div>
          <div className="flex">
            <span className="flex items-center gap-2">
              <IoMdMail /> Email :{" "}
            </span>
            <span className="flex items-center ml-2">toanb3074@gmail.com</span>
          </div>
          <div className="flex">
            <span className="flex items-center gap-2">
              <MdOutlinePhoneIphone /> Phone :{" "}
            </span>
            <span className="flex items-center ml-2">0584450677</span>
          </div>
        </div>
        <div className="w-[50%] flex justify-center"></div>
      </div>
    </div>
  );
};

export default FQA;
