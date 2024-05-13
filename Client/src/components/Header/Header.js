import React, { Fragment, useState } from "react";
import logo from "../../assets/logo.png";
import icons from "../../ultils/icons";
import { Link } from "react-router-dom";
import path from "../../ultils/path";

import { useSelector, useDispatch } from "react-redux";
import { Showcart } from "../../store/app/appslice";

const { MdPhone, IoMdMail, HiOutlineShoppingBag, FaUserCircle, GoHeartFill , FaAngleDown } =
  icons;
const Header = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const [isshowoptions, setisshowoptions] = useState(false);
  return (
    <div className="w-full md:flex justify-center xl:justify-between xl:w-main items-center h-[110px] py-[35px] hidden">
      <Link className="flex justify-center" to={`/${path.HOME}`}>
        <img src={logo} alt="Logo" className="w-[234px] object-contain z-50"></img>
      </Link>
      <div className="flex text-[14px] justify-center">
        <div className="hidden lg:block flex-col px-6 border-r items-center">
          <span className="flex gap-4 items-center ">
            <MdPhone color="red" />
            <span className="font-semibold">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="hidden xl:block items-center px-6 border-r">
          <span className="flex gap-4 items-center ">
            <IoMdMail color="red" />
            <span className="font-semibold">SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        {current && (
          <Fragment>
            <div
              onClick={() => dispatch(Showcart())}
              className="cursor-pointer flex items-center justify-center gap-2 px-6 border-r z-40">
              <HiOutlineShoppingBag color="red" />
              <span>{`${current?.cart?.length || 0} item(s)`}</span>
            </div>
            <Link  to={`/${[path.WISHLIST]}`} className="cursor-pointer flex items-center justify-center gap-2 px-6 border-r z-40">
              <GoHeartFill color="red" />
              <span>{`${current?.wishlist?.length || 0} item(s)`}</span>
            </Link>
            <div
              onClick={() => setisshowoptions((prev) => !prev)}
              className="cursor-pointer items-center px-6 justify-center text-[16px] gap-2 relative hidden sm:block md:flex">
              {current && current.avatar ? (
                <img className="h-10 w-10 rounded-full" src={current.avatar} alt="Avatar" />
              ) : (
                <FaUserCircle />
              )}
              <span className="flex items-center justify-center">Profile <FaAngleDown/></span>
              {isshowoptions && (
                <div className="absolute flex-col text-[14px] p-2 ml-10 flex top-full bg-gray-100 min-w-[160px] py-2 z-50">
                  <Link to={`/${[path.PERSONAL]}`}>PERSONAL</Link>
                  <Link className="mt-2" to={`/${[path.HISTORY]}`}>ORDER HISTORY</Link>
                  {+current.role === 1945 && (
                    <Link
                      className="mt-2"
                      to={`/${path.ADMIN}/${[path.CREATE_PRODUCTS]}`}>
                      Admin workspace
                    </Link>
                  )}
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Header;
