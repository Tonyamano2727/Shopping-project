import React from 'react'
import { renderStarFromNumber ,formatMoney } from '../ultils/helper'
const ProductsCard = ({price , totalRatings , title , thumb , images}) => {
  return (
    <div className='w-1/3 flex-auto flex p-4 '>
      <img src={images} alt='products' className='w-[40%] object-contain p-4'></img>
      <div className="flex flex-col items-start gap-1 w-full leading-10 ">
          <span className="line-clamp-1 font-semibold text-[20px] mt-4">{title}</span>
          <span className="flex h-4">{renderStarFromNumber(totalRatings)}</span>
          <span>{`${formatMoney(price)} VNĐ `}</span>
        </div>
    </div>
  )
}

export default ProductsCard
