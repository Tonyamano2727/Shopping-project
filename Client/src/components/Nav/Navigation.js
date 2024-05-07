import React, { useState } from "react";
import { navigation } from "../../ultils/contants";
import { NavLink } from "react-router-dom";
import { createSlug } from "../../ultils/helper";
import { useSelector } from "react-redux";

const Navigation = () => {

  const [showMenu, setShowMenu] = useState(false);
  const { categories } = useSelector((state) => state.app);
  const [showSelect, setShowSelect] = useState(false);
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const isActive = ({ match }) => {
    return match
      ? "lg:pr-10 hover:text-main text-main"
      : "lg:pr-10 hover:text-main";
  };

  const toggleSelect = () => {
    setShowSelect(!showSelect);
  };

  return (
    <div className="w-full  relative bottom-[75px] md:bottom-0">
      <div className="w-full h-auto flex justify-center items-center flex-col">
        <button
          
          className="md:hidden focus:outline-none relative mb-3 w-full flex justify-end">
          <svg onClick={toggleMenu}
            className="h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z" />
          </svg>
        </button>
        <div
          className={`md:flex ${
            showMenu ? "flex" : "hidden"
          } justify-center w-full flex flex-wrap p-6 md:p-0 bg-red-500 md:bg-white text-white sm:text-black text-[18px]`}>
          {navigation.map((el) => (
            <NavLink
              className="md:pr-10 sm:hover:text-main md:w-auto w-[100%] font-semibold hover:text-black sm:text-black"
              to={el.path}
              key={el.id}
              isActive={isActive}>
              {el.value}
            </NavLink>
          ))}
          <div className="flex justify-center text-[13px] lg:text-[15px] xl:text-[17px] w-[100%] flex-auto md:bg-gray-300  bg-red-500 ">
            <div className="flex justify-center w-full  ">
              <div className="hidden md:flex">
                {categories?.map((el) => (
                  <NavLink
                    key={createSlug(el.title)}
                    to={createSlug(el.title)}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-main text-white px-5 pt-[15px] pb-[14px] hover:text-gray-500 "
                        : "px-5 pt-[15px] pb-[14px] hover:text-gray-500"
                    }>
                    {el.title}
                  </NavLink>
                ))}
              </div>
              <div className="md:hidden w-full sm:border-none mr-2">
                <select
                  className=" w-full focus:outline-none  bg-red text-[17px] bg-red-500 font-semibold text-white mr-2"
                  onChange={(e) => (window.location.href = e.target.value)}>
                  <option className="mr-2">SELECT A CATEGOTY</option>
                  {categories?.map((el) => (
                    <option
                      key={createSlug(el.title)}
                      value={createSlug(el.title)}>
                      {el.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Navigation;
