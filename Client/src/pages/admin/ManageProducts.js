import React,{useCallback, useEffect , useState} from "react";
import { InputForm , Pagination } from "../../components";
import { useForm } from "react-hook-form";
import { apiGetProducts } from "../../apis";
import { formatMoney , renderStarFromNumber } from "../../ultils/helper";
import {useSearchParams} from 'react-router-dom'
import useDebounce from "../../hooks/useDebounce";
import Updateproducts from "./Updateproducts";
import { apiDeleteproduct } from "../../apis";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const ManageProducts = () => {
  const {
    register,
    formState: { errors },
    watch
  } = useForm();

  const [params] = useSearchParams()
  const [products, setProducts] = useState(null)
  const [counts, setcounts] = useState(0)
  const [editproduct, seteditproduct] = useState(null)
  const [Update, setUpdate] = useState(false)


  const render = useCallback(() => {
    setUpdate(!Update)
  })

  const fetchProducts = async (params) =>{
    const response = await apiGetProducts({...params , limit: process.env.REACT_APP_PRODUCT_LIMIT})
    if(response.success) {
      setProducts(response.products)
      setcounts(response.counts)
    }
    console.log(response);
  }
  
  const querydeBounce = useDebounce(watch('q'),800)

  useEffect(() => {
    const searchParams = Object.fromEntries([...params])
    if (querydeBounce) searchParams.q = querydeBounce
    fetchProducts(searchParams)
  },[params , querydeBounce , Update])

  const handledeleteproduct = (pid) => {
      Swal.fire({
        title: 'Are you sure',
        text: 'Are you sure remove this product',
        icon: 'warning',
        showCancelButton:true
      }).then(async(rs) => {
        if(rs.isConfirmed){
          const response = await apiDeleteproduct(pid)
          if(response.success) toast.success(response.mes)
          else toast.error(response.mes)
        render()
        }
      })
  }
  return (
    <div className="w-full flex flex-col gap-4 text-center relative">
      {editproduct && <div className="absolute inset-0 bg-white">
        <Updateproducts editproduct={editproduct} render={render} seteditproduct={seteditproduct}/>
      </div>}
      <div className="p-4 border-b w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight ">ManageProducts</h1>
      </div>
      <div className="flex w-full justify-end items-center px-4">
        <form className="w-[45%]">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullwith
            placeholder="Search product by title"
          />
        </form>
      </div>
      <table className="table-auto">
          <thead>
            <tr className="border bg-sky-700 text-white">
              <th>STT</th>
              <th>Thumb</th>
              <th>Title</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Sold</th>
              <th>Color</th>
              <th>Ratings</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              {products?.map((el , idx) => (
                <tr className="border-b " key={el._id}>
                    <td>{idx + 1 }</td>
                    <td className="flex justify-center"><img src={el.thumb} alt="thumb" className="w-12 h-12 object-cover"/></td>
                    <td>{el.title}</td>
                    <td>{el.brand}</td>
                    <td>{el.category}</td>
                    <td>{`${formatMoney(el.price)} VNĐ `}</td>
                    <td>{el.quantity}</td>
                    <td>{el.sold}</td>
                    <td>{el.color}</td>
                    <td>{el.totalRatings}</td>
                    <td>
                      <span onClick={() => seteditproduct(el)} className="text-red-500 hover:underline cursor-pointer px-2">Edit</span>
                      <span onClick={() => handledeleteproduct(el._id)} className="text-red-500 hover:underline cursor-pointer px-2">Delete</span>
                      </td>
                </tr>
              ))}
          </tbody>
      </table>
      <div className="w-full flex justify-end my-8">
      <Pagination totalCount={counts}>
      </Pagination>
    </div>
    </div>
 
  );
};

export default ManageProducts;
