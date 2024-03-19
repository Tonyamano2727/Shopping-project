import React from 'react'
import {navigation} from '../ultils/contants'
import { NavLink } from 'react-router-dom'


const Navigation = () => {
  return (
    <div className='w-full h-[48px] py-2 border-y mb-6 text-sm flex justify-center items-center'>
      {navigation.map(el => (
        <NavLink to={el.path}
        key={el.id}
        className={({isActive}) => isActive ? 'pr-12 hover:text-main text-main' : 'pr-12 hover:text-main'}
        >
          {el.value}
        </NavLink>
      ))}
    </div>
  )
}

export default Navigation
