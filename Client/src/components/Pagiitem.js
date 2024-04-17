import React from 'react'
import clsx from 'clsx'

const Pagiitem = ({children}) => {
  return (
    <div className={clsx('p-4 w-10 h-10 flex cursor-pointer items-center justify-center hover:rounded-full hover:bg-gray-300' , !Number
    (children) && 'items-end' , Number(children) && 'items-end' )}>
        {children}
    </div>
  )
}

export default Pagiitem
