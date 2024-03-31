import React from 'react'
import { NavLink } from 'react-router-dom'
import {createSlug} from '../ultils/helper'
import { useSelector } from 'react-redux'


const Sidebar = () => {
  const {categories} = useSelector(state => state.app)
  // console.log(categories);
  // null ko su dung duoc ap
  return (
    <div className="flex flex-col gap-5 mt-9 w-[100%] flex-auto ">
      <div className='flex justify-center mb-5'>
      {categories?.map(el => (
        <NavLink
        key={createSlug(el.title)}
        to={createSlug(el.title)}
        className={({isActive}) => isActive 
        ? 'bg-main text-white px-5 pt-[15px] pb-[14px] hover:text-main' 
        : 'px-5 pt-[15px] pb-[14px] hover:text-main'}
        >
            {el.title}
        </NavLink>
      ))}
    </div>
    </div>
  )
}

export default Sidebar
