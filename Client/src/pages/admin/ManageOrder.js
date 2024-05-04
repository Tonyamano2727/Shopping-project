import React, { useEffect , useState} from "react";
import { apigetorder } from "../../apis";
import { InputForm, Pagination } from "../../components";
import { useForm } from "react-hook-form";

const ManageOrder = () => {
  const [Order, setorder] = useState(null)
  const [counts, setcounts] = useState(0);
  const {register, formState:{errors},watch} = useForm()
  const q = watch('q')
  const fetchOrder = async (params) => {
    const response = await apigetorder({
      ...params,
      limit: process.env.REACT_APP_PRODUCT_LIMIT,
    });
    if(response.success){
      setorder(response.Order)
      setcounts(response.counts);
    } 
    console.log(response);
  };
  useEffect(() => {
    fetchOrder()
  },[])
  return(
    <div>
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b">
        <span>ManageOrder</span>
      </h1>
      <div className="flex w-full justify-end items-center px-4">
        <form className="w-[45%]">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullwith
            placeholder="Search order by status"
          />
        </form>
      </div>
      <table className="w-full mt-5">
        <thead>
          <tr className="border bg-sky-700 text-white">
            <th>#</th>
            <th>Products</th>
            <th>Total</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Action</th>  
          </tr>
        </thead>
        <tbody>
          {Order?.map((el, idx) => (
            <tr className="border-b " key={el._id}>
              <td>{idx + 1}</td>
              <td className="flex justify-center">
                <span>
                    {el.products?.map(item => <span>
                      {`${item.title} - ${item.color}`}
                    </span>)}
                </span>
              </td>
              <td>{el.title}</td>
              <td>{el.brand}</td>
              <td>{el.category}</td>
              
              <td>{el.quantity}</td>
              <td>{el.sold}</td>
              <td>{el.color}</td>
              <td>{el.totalRatings}</td>
              {/* <td>
                <span
                  onClick={() => seteditproduct(el)}
                  className="text-red-500 hover:underline cursor-pointer px-2">
                  Edit
                </span>
                <span
                  onClick={() => handledeleteproduct(el._id)}
                  className="text-red-500 hover:underline cursor-pointer px-2">
                  Delete
                </span>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end my-8">
        <Pagination totalCount={counts}></Pagination>
      </div>
    </div>
  ) 
};

export default ManageOrder;
