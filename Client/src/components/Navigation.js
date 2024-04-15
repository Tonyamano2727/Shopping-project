import React from 'react'
import {navigation} from '../ultils/contants'
import { NavLink } from 'react-router-dom'


const Navigation = () => {
  return (
    <div className='w-full h-[48px] py-2 border-y flex justify-center items-center font-semibold'>
      {navigation.map(el => (
        <NavLink to={el.path}
        key={el.id}
        className={({isActive}) => isActive ? 'pr-10 hover:text-main text-main' : 'pr-10 hover:text-main'}
        >
          {el.value}
        </NavLink>
      ))}
    </div>
  )
}

export default Navigation
