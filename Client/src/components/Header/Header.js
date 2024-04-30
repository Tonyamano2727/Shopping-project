import React,{Fragment , useState} from "react";
import logo from "../../assets/logo.png";
import icons from "../../ultils/icons";
import { Link} from "react-router-dom";
import path from "../../ultils/path";

import { useSelector } from "react-redux";

const { MdPhone, IoMdMail, HiOutlineShoppingBag, FaUserCircle } = icons;
const Header = () => {
  const { current } = useSelector(state => state.user);
  const [isshowoptions, setisshowoptions] = useState(false)
  return (
    <div className="w-full md:flex justify-center xl:justify-between xl:w-main items-center h-[110px] py-[35px] ">
      <Link className="flex justify-center" to={`/${path.HOME}`}>
        <img src={logo} alt="Logo" className="w-[234px] object-contain"></img>
      </Link>
      <div className="flex text-[14px] justify-center">
        <div className="hidden md:block flex-col px-6 border-r items-center">
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
        {current && 
          <Fragment>
            <div className="cursor-pointer flex items-center justify-center gap-2 px-6 border-r ">
              <HiOutlineShoppingBag color="red" />
              <span>{`${current?.cart?.length || 0} item(s)`}</span>
            </div>
            <div
              onClick={() => setisshowoptions(prev => !prev)}
              className="cursor-pointer flex items-center px-6 justify-center text-[16px] gap-2 relative">
              <FaUserCircle />
              <span>Profile</span>
              {isshowoptions && <div className='absolute flex-col text-[14px] p-2 flex top-full bg-gray-300 min-w-[150px] py-2'>
                  <Link to={`/${path.MEMBER}/${[path.PERSONAL]}`}>
                    PERSONAL
                  </Link>
                  {+current.role === 1945 && <Link className="mt-2" to={`/${path.ADMIN}/${[path.CREATE_PRODUCTS]}`}>
                    Admin workspace
                  </Link>}
              </div>}
            </div>
            
          </Fragment>
        }
      </div>
    </div>
  );
};

export default Header;
