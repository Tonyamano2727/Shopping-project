import React, { useEffect, useState } from "react";
import icons from "../ultils/icons";
import { apiGetProducts } from "../apis/products";
import { renderStarFromNumber, formatMoney } from "../ultils/helper";
import { Countdow } from "./";
import BannerDealIphone from '../assets/Bannerdeal.png'
const { AiFillStar, IoMenu } = icons;
let idInterval
const Dealdaily = () => {
  const [dealdaily, setDealdaily] = useState(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expire, setExpire] = useState(false);

  const fetchDealdaily = async () => {
    const responese = await apiGetProducts({
      limit: 1,
      page: Math.round(Math.random() * 10),
      totalRatings: 5,
    });
    // console.log(responese);
    if (responese.success) {
      setDealdaily(responese.products[0]);
      const h = 24 - new Date().getHours()
      const m = 60 - new Date().getMinutes()
      const s = 60 - new Date().getSeconds
      setHour(h);
      setMinute(m);
      setSecond(s);
    }else{
      setHour(0);
      setMinute(59);
      setSecond(59);
    }
  };

  // useEffect(() => {
  //   fetchDealdaily();
  // }, []);
  useEffect(() => {
    idInterval && clearInterval(idInterval)
    fetchDealdaily()
  }, [expire]);
  useEffect(() => {
     idInterval = setInterval(() => {
      // console.log('interval');
      if (second > 0) setSecond((prev) => prev - 1);
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(5);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(1);
            setSecond(5);
          } else {
            setExpire(!expire);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour, expire]);
  return (
    <div className="w-full justify-between flex">
      <div className="w-[30%] text-center text-lg border flex-auto justify-center items-center flex flex-col">
        <div className="flex items-center justify-between  pt-4 gap-2">
          <span className="flex-2 flex justify-center items-center">
            <AiFillStar size={20} color="#DD1111" />
          </span>
          <span className="flex-4 font-bold text-[25px]">DEALDAILY</span>
          <span className="flex-5"></span>
        </div>
        <div className="w-full flex flex-col items-center pt-4">
          <img
            src={dealdaily?.thumb || ""}
            alt=""
            className="w-full h-[400px] object-contain"></img>
          <div className="flex flex-col items-center gap-1 w-full leading-10">
            <span className="line-clamp-1 font-semibold text-[20px] mt-4">
              {dealdaily?.title}
            </span>
            <span className="flex h-4">
              {renderStarFromNumber(dealdaily?.totalRatings)}
            </span>
            <span>{`${formatMoney(dealdaily?.price)} VNĐ `}</span>
          </div>
        </div>
        <div className="px-4 flex justify-center w-full gap-2">
          <Countdow unit={"Hours"} number={hour} />
          <Countdow unit={"Minutes"} number={minute} />
          <Countdow unit={"Seconds"} number={second} />
        </div>
        <button
          type="button"
          className="flex w-[84%] p-2 mt-2 gap-2 items-center justify-center bg-main hover:bg-gray-500 text-white font-medium">
          <IoMenu />
          <span>Options</span>
        </button>
      </div>
      <div className="w-[70%]">
        <img
          className="w-[100%] h-[400px] object-cover mb-8"
          src={BannerDealIphone}
          alt="banner products"></img>
        <img
          className="w-[100%] h-[400px] object-fill"
          src="https://th.bing.com/th/id/R.1aaf5e65043645c1bdb0612b8e954dfa?rik=OYsXYWI2QthuXQ&pid=ImgRaw&r=0"
          alt="banner products"></img>
      </div>
    </div>
  );
};

export default Dealdaily;
