import React,{useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct } from "../../apis/products";
import { Breadcrumb } from "../../components";
const Detailproducts = () => {
  const { pid, title } = useParams();
  const [product, setproduct] = useState(null)
  const fetchProductdata = async () => {
    const response = await apiGetProduct(pid)
    if(response.success) setproduct(response.productData)
  }
  useEffect (() => {
    if(pid) fetchProductdata()
  },[pid])
  return (
    <div>
      <div className="h-[81px flex justify-center ">
        <div className="w-main">
          <span className="text-[19px] font-medium ">{title}</span>
          <Breadcrumb title={title} category={product?.category}/>
        </div>
      </div>
    </div>
  );
};

export default Detailproducts;
