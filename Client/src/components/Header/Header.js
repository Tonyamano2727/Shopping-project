import React,{Fragment} from "react";
import logo from "../../assets/logo.png";
import icons from "../../ultils/icons";
import { Link} from "react-router-dom";
import path from "../../ultils/path";

import { useSelector } from "react-redux";

const { MdPhone, IoMdMail, HiOutlineShoppingBag, FaUserCircle } = icons;
const Header = () => {
  const { current } = useSelector(state => state.user);
  return (
    <div className=" w-main flex justify-between h-[110px] py-[35px] ">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="Logo" className="w-[234px] object-contain"></img>
      </Link>
      <div className="flex text-[14px]">
        <div className="flex flex-col px-6 border-r items-center">
          <span className="flex gap-4 items-center ">
            <MdPhone color="red" />
            <span className="font-semibold">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col items-center px-6 border-r">
          <span className="flex gap-4 items-center ">
            <IoMdMail color="red" />
            <span className="font-semibold">SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        {current && 
          <Fragment>
            <div className="cursor-pointer flex items-center justify-center gap-2 px-6 border-r">
              <HiOutlineShoppingBag color="red" />
              <span>0 item(s)</span>
            </div>
            <Link
              to={
                +current?.role === 1945
                  ? `/${path.ADMIN}/${path.DASHBOARD}`
                  : `/${path.MEMBER}/${path.PERSONAL}`
              }
              className="cursor-pointer flex items-center px-6 justify-center text-[16px] gap-2">
              <FaUserCircle />
              <span>Profile</span>
            </Link>
          </Fragment>
        }
      </div>
    </div>
  );
};

export default Header;
