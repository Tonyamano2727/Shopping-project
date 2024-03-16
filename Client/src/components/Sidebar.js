import React, {useEffect, useState} from 'react'
import { apiGetCategories } from '../apis/app'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const [categories, setCategories] = useState(null)
  const fectcategories = async () => {
    const response = await apiGetCategories()
    if(response.success) setCategories(response.getallCategory)
    
  }
  useEffect(() => {
    fectcategories()
  }, [])
  console.log(categories);
  return (
    <div>
      Sidebar
    </div>
  )
}

export default Sidebar
