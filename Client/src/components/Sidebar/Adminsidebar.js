import React, { Fragment, useState } from "react";
import logo from "../../assets/logo.png";
import { AdminSidebar } from "../../ultils/contants";
import { NavLink , Link} from "react-router-dom";
import clsx from "clsx";
import { FaAngleDown } from "react-icons/fa";
import { useSelector } from "react-redux";


const activedStyle =
  "px-4 py-2 flex items-center gap-2  bg-gray-300";
const notactivedStyle =
  "px-4 py-2 flex items-center gap-2  hover:bg-gray-100";

const Adminsidebar = () => {
  const { current } = useSelector((state) => state.user);
  const [actived, setactived] = useState([]);
  const handleShowtab = (tabID) => {
    if (actived.some(el => el === tabID)) setactived(prev => prev.filter(el => el!== tabID))
    else setactived(prev => [...prev,tabID])
  }
  
  return (
    <div className="bg-white h-full w-[315px] py-4 border-r">
      <Link to={"/"} className="flex flex-col justify-center gap-2 p-4 items-center">
        <img src={logo} alt="logo" className="w-[200px] object-contain"></img>
        <small>Welcome to Admin {current?.firstname} {current?.lastname} </small>
      </Link>
      <div>
        {AdminSidebar.map(el => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  clsx(isActive && activedStyle, !isActive && notactivedStyle)
                }>
                <span> {el.icon} </span>
                <span> {el.text} </span>
              </NavLink>
            )}
            {el.type === 'PARENT' && (
              <div onClick={() => handleShowtab(+el.id)} className="flex flex-col">
                <div className="flex items-center justify-between px-4 py-2  hover:bg-gray-100 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span> {el.icon} </span>
                    <span> {el.text} </span>
                  </div>
                  <FaAngleDown />
                </div>
                {actived.some(id => +id === +el.id) && (
                  <div  className="flex flex-col pl-4">
                    {el.submenu.map(item => (
                      <NavLink
                        key={el.text}
                        to={item.path}
                        onClick={e => e.stopPropagation()}
                        className={({ isActive }) =>
                          clsx(
                            isActive && activedStyle,
                            !isActive && notactivedStyle
                          )
                        }>
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Adminsidebar;
