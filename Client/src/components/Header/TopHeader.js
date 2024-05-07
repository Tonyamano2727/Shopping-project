import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { getCurrent } from "../../store/user/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../ultils/icons";
import { logout } from "../../store/user/userSlice";

const { IoLogOut, FaUserCircle } = icons;
const TopHeader = () => {
  const [isshowoptions, setisshowoptions] = useState(false);

  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) dispatch(getCurrent());
  }, [dispatch, isLoggedIn]);

  return (
    <div className="h-auto w-full bg-main flex justify-center items-center">
      <div className="w-full md:w-main flex flex-col md:flex-row lg:items-center lg:justify-between items-center md:h-[48px] justify-between  text-xs text-white text-start lg:text-center">
        <span className="md:w-[40%] text-start md:text-center">
          ORDER ONLINE OR CALL US (+1800) 000 8808
        </span>
        {isLoggedIn ? (
          <div className="flex gap-2 text-sm md:w-[30%] justify-center items-center">
            <span className="text-start md:text-center">{`Welcome, ${current?.firstname} ${current?.lastname}`}</span>
            <span className="cursor-pointer" onClick={() => dispatch(logout())}>
              <IoLogOut />
            </span>
          </div>
        ) : (
          <Link
            className="mt-2 md:mt-0 hover:text-gray-800"
            to={`/${path.LOGIN}`}>
            Sign In or Create Account
          </Link>
        )}
      </div>
      <div
        onClick={() => setisshowoptions((prev) => !prev)}
        className="cursor-pointer items-center text-white flex px-6 justify-center text-[16px] gap-2 relative md:hidden sm:block m-2">
        {current && current.avatar ? (
          <img
            className="h-10 w-10 rounded-full"
            src={current.avatar}
            alt="Avatar"
          />
        ) : (
          <FaUserCircle />
        )}
        <span>Profile</span>
        {isshowoptions && (
          <div className="absolute flex-col text-[14px] p-2 ml-10 flex top-full bg-gray-100 min-w-[160px] py-2 text-black md:hidden">
            <Link to={`/${[path.PERSONAL]}`}>PERSONAL</Link>
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
    </div>
  );
};

export default TopHeader;
