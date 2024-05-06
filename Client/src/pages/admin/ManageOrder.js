import React, { useEffect, useState } from "react";
import { apigetorder } from "../../apis";
import { InputForm, Pagination } from "../../components";
import { useForm } from "react-hook-form";
import { formatMoney } from "../../ultils/helper";
import moment from "moment";

const ManageOrder = () => {
  const [Order, setorder] = useState(null);
  const [counts, setcounts] = useState(0);
  
  const [totalAmount, setTotalAmount] = useState(0); // Thêm biến lưu tổng tiền
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const q = watch("q");

  const fetchOrder = async (params) => {
    const response = await apigetorder({
      ...params,
      limit: process.env.REACT_APP_PRODUCT_LIMIT,
    });
    if (response.success) {
      setorder(response.Order);
      setcounts(response.counts);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    if (Order) {
      let total = 0;
      Order.forEach((el) => {
        total += el.total * 23500;
      });
      setTotalAmount(total);
    }
  }, [Order]);
  return (
    <div className="flex justify-center w-full  flex-col">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b">
        <span>ManageOrder</span>
      </h1>
      <div className="flex w-full justify-end items-center px-4">
        <form className="w-[100%]">
          <InputForm
            style={"w500"}
            id="q"
            register={register}
            errors={errors}
            fullwith
            placeholder="Search order by status"
          />
        </form>
      </div>
      <table className="w-[98%] mt-5 ">
        <thead>
          <tr className="border border-black">
            <th className="p-5 gap-x-2 items-center py-5 px-6 text-red-500 hover:text-indigo-600 ">#</th>
            <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">Products</th>
            <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">Total</th>
            <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">Status</th>
            <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">Created At</th>
          </tr>
        </thead>
        <tbody className="">
          {Order?.map((el, idx) => (
            <tr className="border border-gray-500" key={el._id}>
              <td className="text-center">{idx + 1}</td>
              <td className="">
                <span className="flex flex-col items-center justify-center p-5">
                  {el.products?.map((item) => (
                    
                    <span>
                      {`${item.title} - ${item.color} - ${formatMoney(
                        item.price
                      )} VND`}
                      {/* <img src={item.thumb}></img> */}
                    </span>
                  ))}
                </span>
              </td>
              <td className="text-center">{`${formatMoney(el.total * 23500)} VND`}</td>
              <td className="text-center">{el.status}</td>
              <td className="text-center">{moment(el.createdAt).format("DD/MM/YYYY")}</td>

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
      <div>
        <p>Total Amount: {formatMoney(totalAmount)} VND</p>{" "}
      </div>
    </div>
  );
};

export default ManageOrder;
