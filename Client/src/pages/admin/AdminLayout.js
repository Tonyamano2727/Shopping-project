import React from 'react'
import { Adminsidebar } from '../../components'
import {Outlet , Navigate} from 'react-router-dom'
import path from '../../ultils/path'
import { useSelector } from 'react-redux'

const AdminLayout = () => {
  const {isLoggedIn , current} = useSelector(state => state.user)
  if(!isLoggedIn || !current || +current.role !==1945) return <Navigate to={`/${path.LOGIN}`} replace={true}/>
  return (
    <div className=' flex bg-blue-100 min-h-screen relative text-gray-900'>
      <div className='w-[327px] top-0 bottom-0 flex-none absolute'>
        <Adminsidebar/>
      </div>
      <div className='w-[327px]'>

      </div>
      <div className='w-[80%]'>
        <Outlet/>
      </div>
    </div>
  )
}
export default AdminLayout
