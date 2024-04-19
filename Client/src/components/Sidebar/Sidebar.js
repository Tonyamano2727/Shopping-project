import React from 'react'
import { NavLink } from 'react-router-dom'
import {createSlug} from '../../ultils/helper'
import { useSelector } from 'react-redux'


const Sidebar = () => {
  const {categories} = useSelector(state => state.app)
  // console.log(categories);
  // null ko su dung duoc ap
  return (
    <div className="flex flex-col w-[100%]  mb-5 flex-auto bg-gray-300">
      <div className='flex justify-center '>
      {categories?.map(el => (
        <NavLink
        key={createSlug(el.title)}
        to={createSlug(el.title)}
        className={({isActive}) => isActive 
        ? 'bg-main text-white px-5 pt-[15px] pb-[14px] hover:text-gray-500' 
        : 'px-5 pt-[15px] pb-[14px] hover:text-gray-500'}
        >
            {el.title}
        </NavLink>
      ))}
    </div>
    </div>
  )
}

export default Sidebar
