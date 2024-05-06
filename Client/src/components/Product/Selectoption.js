import React from 'react'

const Selectoption = ({icon}) => {
  return (
    <div className='w-10 h-10 bg-slate-50 rounded-full border shadow-md flex cursor-pointer items-center justify-center hover:bg-blue-100 hover:border-blue-100'>
    {icon}
    </div>
  )
}

export default Selectoption
