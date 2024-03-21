import React from 'react'

const Selectoption = ({icon}) => {
  return (
    <div className='w-10 h-10 bg-slate-50 rounded-full border shadow-md flex cursor-pointer items-center justify-center hover:bg-gray-800 hover:text-white hover:border-gray-800'>
    {icon}
    </div>
  )
}

export default Selectoption
