import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Pagination } from "../../components";
import { useForm } from "react-hook-form";
import { apiGetProducts } from "../../apis";
import { formatMoney, renderStarFromNumber } from "../../ultils/helper";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import Updateproducts from "./Updateproducts";
import { apiDeleteproduct } from "../../apis";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
const ManageProducts = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  const [params] = useSearchParams();
  const [products, setProducts] = useState(null);
  const [counts, setcounts] = useState(0);
  const [editproduct, seteditproduct] = useState(null);
  const [Update, setUpdate] = useState(false);

  const render = useCallback(() => {
    setUpdate(!Update);
  });

  const fetchProducts = async (params) => {
    const response = await apiGetProducts({
      ...params,
      limit: process.env.REACT_APP_PRODUCT_LIMIT,
    });
    if (response.success) {
      setProducts(response.products);
      setcounts(response.counts);
    }
    console.log(response);
  };

  const querydeBounce = useDebounce(watch("q"), 800);

  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);
    if (querydeBounce) searchParams.q = querydeBounce;
    fetchProducts(searchParams);
  }, [params, querydeBounce, Update]);

  const handledeleteproduct = (pid) => {
    Swal.fire({
      title: "Are you sure",
      text: "Are you sure remove this product",
      icon: "warning",
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteproduct(pid);
        if (response.success) toast.success(response.mes);
        else toast.error(response.mes);
        render();
      }
    });
  };
  return (
    <div className="w-full flex flex-col gap-4 relative ">
      {editproduct && (
        <div className="absolute inset-0 bg-white ">
          <Updateproducts
            editproduct={editproduct}
            render={render}
            seteditproduct={seteditproduct}
          />
        </div>
      )}
      <div className="p-4 w-full flex  flex-col">
        <h1 className="text-3xl font-semibold tracking-tight ">
          ManageProducts
        </h1>
        <p>Let's grow to your business! Create your product and upload here</p>
      </div>
      <div className="flex w-full justify-end items-center ">
        <form className="w-full">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullwith
            placeholder="Search product by title"
          />
        </form>
      </div>
      <table className="table-auto text-center">
        <thead>
          <tr className="border">
            <th className="p-5 gap-x-2 items-center py-5 px-6 text-red-500 hover:text-indigo-600 ">STT</th>
            <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">Products</th>
            <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">Color</th>
            <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">Brand</th>
            <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">Category</th>
            <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">Price</th>
            <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">Quantity</th>
            <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">Sold</th>
            <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">Ratings</th>
            <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((el, idx) => (
            <tr className="border-b" key={el._id}>
              <td>{idx + 1}</td>
              <td className="flex justify-center items-center">
                <img
                  src={el.thumb}
                  alt="thumb"
                  className="w-[100px] h-[150px] object-contain"
                />
                <div className="flex flex-col">
                  <span className='font-medium'>{el.title}</span>
                </div>
              </td>
              <td>{el.color}</td>
              <td>{el.brand}</td>
              <td>{el.category}</td>
              <td>{`${formatMoney(el.price)} VNĐ `}</td>
              <td>{el.quantity}</td>
              <td>{el.sold}</td>

              <td>{el.totalRatings}</td>
              <td>
                <div className="flex items-center justify-center">
                  <span
                    onClick={() => seteditproduct(el)}
                    className="hover:underline cursor-pointer px-2 text-blue-500">
                     <FaEdit size={20} />
                  </span>
                  <span
                    onClick={() => handledeleteproduct(el._id)}
                    className="text-red-500 hover:underline cursor-pointer px-2">
                    <RiDeleteBin6Line size={20} />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end my-8">
        <Pagination totalCount={counts}></Pagination>
      </div>
    </div>
  );
};

export default ManageProducts;
