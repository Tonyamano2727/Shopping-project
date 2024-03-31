import React,{useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct } from "../../apis/products";
import { Breadcrumb } from "../../components";
const Detailproducts = () => {
  const { pid, title } = useParams();
  // console.log({pid, title});
  const fetchProductdata = async () => {
    const response = await apiGetProduct(pid)
    console.log(response);
  }
  useEffect (() => {
    if(pid) fetchProductdata()
  },[pid])
  return (
    <div>
      <div className="h-[81px flex justify-center">
        <div className="w-main">
          <h3>{title}</h3>
          <Breadcrumb/>
        </div>
      </div>
    </div>
  );
};

export default Detailproducts;
