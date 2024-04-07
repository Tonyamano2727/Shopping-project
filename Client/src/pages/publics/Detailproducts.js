import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct } from "../../apis/products";
import { Breadcrumb, Button , Selectquantity , Productextraifitem , Productinformation ,Othermany} from "../../components";
import Slider from "react-slick";
import { formatMoney, renderStarFromNumber } from "../../ultils/helper";

import { productExtraif } from "../../ultils/contants";
const Detailproducts = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div
        style={{
          height: "auto",
          borderRadius: "10px",
          padding: "10px",
        }}>
        <div className="h-[auto] position:none">{dots}</div>
      </div>
    ),
    customPaging: (i) => (
      <img
        src={product.images[i]}
        alt={`Dot ${i + 1}`}
        style={{
          width: "100%", // Điều chỉnh kích thước của hình ảnh làm chấm
          // Điều chỉnh kích thước của hình ảnh làm chấm
          // Làm tròn hình ảnh làm chấm
          objectFit: "contain", // Đảm bảo hình ảnh bên trong không bị biến dạng
        }}
      />
    ),
  };

  const { pid, title } = useParams();
  const [product, setproduct] = useState(null);

  const [quantity, setquantity] = useState(1)
  const fetchProductdata = async () => {
    const response = await apiGetProduct(pid);
    if (response.success) setproduct(response.productData);
  };
  useEffect(() => {
    if (pid) fetchProductdata();
  }, [pid]);

  const handleQuantity = useCallback((number) => {
    let previous
    if(!Number(number) || Number(number) < 1) {
       return
    }else {
      setquantity(number)
    }
  },[quantity])
  const handlechangequantity = useCallback((flag) => {
    if(flag === 'minus' && quantity === 1 ) return
    if(flag === 'minus') setquantity(prev => +prev - 1)
    if(flag === 'Plus') setquantity(prev => +prev + 1)
  },[quantity])
  return (
    <div>
      <div className="h-[81px flex justify-center ">
        <div className="w-main">
          <span className="text-[19px] font-medium ">{title}</span>
          <Breadcrumb title={title} category={product?.category} />
        </div>
      </div>
      <div className="w-full m-auto flex justify-between mb-9">
        <div className="flex-4 flex flex-col w-2/5">
          <div className="w-full h-[500px]">
            <Slider {...settings}>
              {product?.images?.map((el) => (
                <img
                  src={el}
                  alt="Subproducts"
                  className="h-[363px] w-[363px] object-contain mt-5 p-3 mb-9"></img>
              ))}
            </Slider>
          </div>
        </div>
        <div className=" w-2/5 flex flex-col">
          <span className="text-[25px] font-semibold">{product?.title}</span>
          <span className="text-[20px]">{`${formatMoney(
            product?.price
          )} VNĐ `}</span>
          <span className="flex mt-3">
            {renderStarFromNumber(product?.totalRatings)}
          </span>
          <span className="flex leading-8 mt-4">{product?.description}</span>
          <span className="text-[17px] mt-4 font-semibold">
            Sold :{product?.sold}
          </span>
          <span className="text-[17px] mt-4 font-semibold">
            Kho :{product?.quantity}
          </span>
          <div className="mt-4 flex flex-col gap-8">
            <Selectquantity quantity={quantity} handleQuantity={handleQuantity} handlechangequantity={handlechangequantity}/>
            <Button fw>Addtocart</Button>
          </div>
        </div>

        <div className=" w-2/5 flex flex-col justify-center items-center">
          {productExtraif.map(el => (
              <Productextraifitem
              key={el.id}
              icon={el.icon}
              title={el.title}
              sub={el.sub}
              />
          ))}
        </div>
      </div>
      <div className="w-full p-7 m-auto">
       <Productinformation/>
      </div>
      <div className=" m-auto">
          <Othermany/>
      </div>
    </div>
  );
};

export default Detailproducts;
