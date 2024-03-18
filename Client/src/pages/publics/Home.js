import React, {useEffect,useState} from 'react'
import { Header,Banner,Navigation,Sidebar } from '../../components'
import { apiGetProducts } from '../../apis/products'
const Home = () => {
  const fectchProducts = async () =>{
    const response = await Promise.all(apiGetProducts())
    console.log(response);
  }
  useEffect(() => {
    fectchProducts()
  })
  return (
    <div className='w-main flex'>
      <div className='flex flex-col gap-5 w-[20%] flex-auto '>
        <Sidebar/>
        <span>Deal daily</span>
      </div>
      <div className='flex flex-col gap-5 pl-5 w-[80%] flex-auto '>
        <Banner/>
        <span>Best Seller</span>
      </div>
    </div>
  )
}

export default Home
