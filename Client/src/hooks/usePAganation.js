import React, {useMemo} from 'react'
import { generateRage } from '../ultils/helper'
import { BiDotsHorizontalRounded } from "react-icons/bi";

const usePAganation = (totalProductCount, currentPage, siblingCount = 1) => {
    
    const paginationArray = useMemo (() => {
        const pagasize = process.env.REACT_APP_PRODUCT_LIMIT || 10
        const paginationCount = Math.ceil(totalProductCount / pagasize)
        const totalPaginationItem = siblingCount + 5

        if(paginationCount <= totalPaginationItem) return generateRage(1 , totalProductCount)

        const isShowLeft = currentPage - siblingCount > 2
        const isShowRight = currentPage + siblingCount < paginationCount - 1

        if(isShowLeft && !isShowRight){
            const rightStart = paginationCount - 4
            const rightRage = generateRage(rightStart , paginationCount)

            return[1,<BiDotsHorizontalRounded/> , ...rightRage]
        }

        if(!isShowLeft && isShowRight) {
            const leftRage = generateRage(1,5)
            return [...leftRage , <BiDotsHorizontalRounded/>  , paginationCount]
        }

        const siblingLeft = Math.max(currentPage - siblingCount, 1)
        const siblingright = Math.min(currentPage + siblingCount, paginationCount)

        if(isShowLeft && isShowRight){
            const middleRage = generateRage(siblingLeft, siblingright)
            return [1, <BiDotsHorizontalRounded/> , ...middleRage, <BiDotsHorizontalRounded/> ,paginationCount]
        }

    },[totalProductCount, currentPage, siblingCount]) 
  
 return paginationArray
}

export default usePAganation
