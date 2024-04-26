import axios from "../axios";

export const apiGetProducts = (params) =>
  axios({
    url: "/products/",
    method: "get",
    params,
  });
export const apiGetProduct = (pid) =>
  axios({
    url: "/products/" + pid,
    method: "get",
  });

export const apiCreateProduct = (data) =>
  axios({
    url: "/products/",
    method: "post",
    data,
  });

export const apiUpdateproduct = (data, pid) =>
  axios({
    url: "/products/" + pid,
    method: "put",
    data,
  });

  export const apiDeleteproduct = (pid) =>
  axios({
    url: "/products/" + pid,
    method: "delete",
  });
