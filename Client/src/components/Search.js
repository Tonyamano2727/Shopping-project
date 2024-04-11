import React, {useState} from 'react'
import icons from "../ultils/icons";

const {FaAngleDown} = icons


const Search = ({name , activedclick , ChangeActiveFilter , type = 'checkbox'}) => {
  
  const [selected, setselected] = useState(0)

  return (
    <div className='p-4 cursor-pointer text-gray-800 gap-6 text-xs relative border w-auto border-gray-400 flex justify-between items-center'
    onClick={() => ChangeActiveFilter(name)}>
      <span className='capitalize'>
        {name}
       
      </span>
      <FaAngleDown/>
      {activedclick === name && <div className='absolute top-full left-0 w-fit p-4 border z-20 bg-white'>
        {type === 'checkbox' && <div className='p-2'>
          <div className='p-4 items-center flex justify-center gap-8'>
            <span className='whitespace-nowrap'>
              {`${selected} selected`}
            </span>
            <span className='underline cursor-pointer hover:text-main'>
                Reset
            </span>
          </div>
          </div>}
      </div>}
    </div>
  )
}

export default Search
