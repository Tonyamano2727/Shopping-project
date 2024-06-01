import React, { useCallback, useEffect, useState } from "react";
import {
  createSearchParams,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { apiGetProduct } from "../../apis/products";
import {
  Breadcrumb,
  Button,
  Selectquantity,
  Productextraifitem,
  Productinformation,
  Othermany,
} from "../../components";
import Slider from "react-slick";
import { formatMoney, renderStarFromNumber } from "../../ultils/helper";
import DOMPurify from "dompurify";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getCurrent } from "../../store/user/asyncAction";
import path from "../../ultils/path";
import Swal from "sweetalert2";

import { productExtraif } from "../../ultils/contants";
import { apiupdatecart, apiupdatewhislist } from "../../apis";
const Detailproducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { current } = useSelector((state) => state.user);
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

  const { pid, title, price } = useParams();
  const [product, setproduct] = useState(null);
  const [quantity, setquantity] = useState(1);
  const fetchProductdata = async () => {
    const response = await apiGetProduct(pid);
    if (response.success) setproduct(response.productData);
  };
  useEffect(() => {
    if (pid) fetchProductdata();
  }, [pid]);

  const handleQuantity = useCallback(
    (number) => {
      window.scrollTo(0, 0);
      let previous;
      if (!Number(number) || Number(number) < 1) {
        return;
      } else {
        setquantity(number);
      }
    },
    [quantity]
  );
  const handlechangequantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") setquantity((prev) => +prev - 1);
      if (flag === "Plus") setquantity((prev) => +prev + 1);
    },
    [quantity]
  );
  const handleAddtoCart = async () => {
    if (!current)
      return Swal.fire({
        title: "Almost",
        text: "Please login first",
        icon: "info",
        cancelButtonText: "Not now!",
        showConfirmButton: true,
        confirmButtonText: "Go to login page",
      }).then(async (rs) => {
        if (rs.isConfirmed)
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
    });
    const response = await apiupdatecart({
      pid,
      color: product?.color,
      quantity,
      price: product?.price,
      title: product?.title,
    });
    
    if (response.success) {
      toast.success(response.mes); // bug togle
      dispatch(getCurrent());
    } else toast.error(response.mes);
  };

  const handleAddtowishlist = async () => {
    if (!current)
      return Swal.fire({
        title: "Almost",
        text: "Please login first",
        icon: "info",
        cancelButtonText: "Not now!",
        showConfirmButton: true,
        confirmButtonText: "Go to login page",
      }).then(async (rs) => {
        if (rs.isConfirmed)
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
    });
    const response = await apiupdatewhislist(pid);
    if (response.success) {
      dispatch(getCurrent());
      toast.success(response.mes); // bug togle
    } else toast.error(response.mes);
  };
  return (
    <div>
      <div className="h-[81px flex justify-center ">
        <div className="w-main mt-5 mb-5">
          <span className="text-[30px] font-medium uppercase">{title}</span>
          <Breadcrumb title={title} category={product?.category} />
        </div>
      </div>
      <div className="w-full m-auto flex flex-wrap mb-9">
        <div className="flex flex-wrap w-[100%] lg:w-[70%] justify-center">
          <div className="flex-4 flex flex-col w-[100%] lg:w-[50%]">
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
          <div className="w-[100%] lg:w-[50%] flex flex-col text-center lg:text-start">
            <span className="text-[25px] font-semibold">{product?.title}</span>
            <span className="text-[20px]">{`${formatMoney(
              product?.price
            )} VNĐ `}</span>
            <span className="flex mt-3 justify-center lg:justify-start">
              {renderStarFromNumber(product?.totalRatings)}
            </span>
            <div>
              {product?.description?.length > 1 && (
                <span className="flex leading-8 mt-4 flex-col">
                  {product?.description}
                </span>
              )}
              {product?.description?.length === 1 && (
                <div
                  className="flex leading-8 mt-4 flex-col"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product?.description[0]),
                  }}></div>
              )}
            </div>
            <span className="text-[17px] mt-4 font-semibold">
              Color :{product?.color}
            </span>
            <span className="text-[17px] mt-4 font-semibold">
              Sold :{product?.sold}
            </span>
            <span className="text-[17px] mt-4 font-semibold">
              Kho :{product?.quantity}
            </span>
            <div className="mt-4 flex flex-col gap-8">
              <Selectquantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handlechangequantity={handlechangequantity}
              />
              <Button fw handleOnclick={handleAddtoCart}>
                Addtocart
              </Button>
              <Button fw handleOnclick={handleAddtowishlist}>
                AddtoWishlist
              </Button>
            </div>
          </div>
        </div>

        <div className=" w-[30%]  flex-col justify-center lg:w-[30%] items-center hidden lg:flex">
          {productExtraif.map((el) => (
            <Productextraifitem
              key={el.id}
              icon={el.icon}
              title={el.title}
              sub={el.sub}
            />
          ))}
        </div>
      </div>
      <div className="w-full xl:p-7 m-auto">
        <Productinformation />
      </div>
      <div className=" m-auto">
        <Othermany />
      </div>
    </div>
  );
};

export default Detailproducts;
