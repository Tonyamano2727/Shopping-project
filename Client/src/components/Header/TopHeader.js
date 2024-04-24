import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { getCurrent } from "../../store/user/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../ultils/icons";
import { logout } from "../../store/user/userSlice";
import Swal from "sweetalert2";

const { IoLogOut } = icons;
const TopHeader = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) dispatch(getCurrent());
  }, [dispatch, isLoggedIn]);

  return (
    <div className="h-[38px] w-full bg-main flex justify-center items-center">
      <div className="w-full md:w-main flex flex-col md:flex-row items-center justify-between text-xs text-white">
        <span className="md:w-[40%] text-center">
          ORDER ONLINE OR CALL US (+1800) 000 8808
        </span>
        {isLoggedIn ? (
          <div className="flex gap-2 text-sm md:w-[30%] justify-center items-center">
            <span>{`Welcome, ${current?.firstname} ${current?.lastname}`}</span>
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
    </div>
  );
};

export default TopHeader;
