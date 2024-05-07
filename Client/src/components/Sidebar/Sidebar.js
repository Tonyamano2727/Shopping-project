// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { createSlug } from "../../ultils/helper";
// import { useSelector } from "react-redux";

// const Sidebar = () => {
//   const { categories } = useSelector((state) => state.app);
//   const [showSelect, setShowSelect] = useState(false);

//   const toggleSelect = () => {
//     setShowSelect(!showSelect);
//   };

//   return (
//     <div className="flex justify-center text-[13px] lg:text-[15px] xl:text-[17px] w-[100%] flex-auto md:bg-gray-300 bg-white">
//       <div className="flex justify-center w-full  ">
//         <div className="hidden md:flex">
//           {categories?.map((el) => (
//             <NavLink
//               key={createSlug(el.title)}
//               to={createSlug(el.title)}
//               className={({ isActive }) =>
//                 isActive
//                   ? "bg-main text-white px-5 pt-[15px] pb-[14px] hover:text-gray-500 "
//                   : "px-5 pt-[15px] pb-[14px] hover:text-gray-500"
//               }>
//               {el.title}
//             </NavLink>
//           ))}
//         </div>
//         <div className="md:hidden m-[10px] w-full border border-black sm:border-none">
//           <select
//             className=" w-full p-2 "
//             onChange={(e) => (window.location.href = e.target.value)}>
//             <option className="">Select a category</option>
//             {categories?.map((el) => (
//               <option key={createSlug(el.title)} value={createSlug(el.title)}>
//                 {el.title}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

 