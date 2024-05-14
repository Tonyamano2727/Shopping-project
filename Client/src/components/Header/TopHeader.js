import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { getCurrent } from "../../store/user/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../ultils/icons";
import { logout } from "../../store/user/userSlice";

const { IoLogOut } = icons;
const TopHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) dispatch(getCurrent());
  }, [dispatch, isLoggedIn]);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="h-auto w-full bg-main flex justify-center items-center">
      <div className="w-full md:w-main flex flex-col md:flex-row lg:items-center lg:justify-between items-center md:h-[48px] justify-between  text-xs text-white text-start lg:text-center">
        <span className="md:w-[40%] text-start md:text-center">
          ORDER ONLINE OR CALL US (+1800) 000 8808
        </span>
        {isLoggedIn ? (
          <div className="flex gap-2 text-sm md:w-[30%] justify-center items-center">
            <span className="text-start md:text-center">{`Welcome, ${current?.firstname} ${current?.lastname}`}</span>
            <span className="cursor-pointer" onClick={handleLogout}>
              <IoLogOut />
            </span>
          </div>
        ) : (
          <Link
            className="mt-2 md:mt-0 hover:text-gray-800 mb-2 md:mb-0 md:w-[30%] w-full text-center"
            to={`/${path.LOGIN}`}>
            Sign In or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopHeader;
