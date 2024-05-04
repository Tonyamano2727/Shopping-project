import React, { useEffect } from "react";
import { apigetorder } from "../../apis";

const ManageOrder = () => {
  const fetchOrder = async (params) => {
    const response = await apigetorder({
      ...params,
      limit: process.env.REACT_APP_PRODUCT_LIMIT,
    });
    console.log(response);
  };
  useEffect(() => {
    fetchOrder()
  },[])
  return <div>ManageOrder</div>;
};

export default ManageOrder;
