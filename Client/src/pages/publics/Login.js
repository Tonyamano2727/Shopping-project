import React, { useState, useCallback, useEffect } from "react";
import { Inputfields, Button } from "../../components";
import { apiRegister, apiLogin, apiForgotPassword } from "../../apis/user";
import Swal from "sweetalert2";
import { useNavigate, useSearchParams } from "react-router-dom";
import path from "../../ultils/path";
import { login } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validate } from "../../ultils/helper";
const Login = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [payload, setpayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
    address: "",
  });

  const [isRegister, setisRegister] = useState(false);
  const [isForgotpassword, setisForgotpassword] = useState(false);
  const [searchParams] = useSearchParams()
  
  const resetPayLoad = () => {
    setpayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
      address: "",
    });
  };
  const [invalidFields, setinvalidFields] = useState([]);
  const [email, Setemail] = useState("");
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    console.log(response);
    if (response.success) {
      toast.success(response.mes);
    } else toast.info(response.mes);
  };
  useEffect(() => {
      resetPayLoad()
  },[isRegister])
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, address, ...data } = payload;

    const invalids = isRegister ? validate(payload,setinvalidFields) : validate(data,setinvalidFields)
   

    if (invalids === 0) {
      if (isRegister) {
      const response = await apiRegister(payload);

      if (response.success) {
        Swal.fire("Congratulation", response.mes, "Success").then(() => {
          setisRegister(false);
          resetPayLoad();
        });
      } else {
        Swal.fire("Oops", response.mes, "eroor");
      }
    } else {
      const rs = await apiLogin(data);
      if (rs.success) {
        dispath(
          login({
            isLoggedIn: true,
            token: rs.Accesstoken,
            userData: rs.userData,
          })
        );
        if(searchParams.get('redirect')){
          navigate(searchParams.get('redirect'))
          window.location.reload();
        }else{
          window.location.href = `/${path.HOME}`;
        }
      } else {
        Swal.fire("Oops", rs.mes, "eroor");
      }
    }
    }
  }, [payload, isRegister]);

  return (
    <div className="bg-gray-100 flex justify-center flex-col items-center">
      {isForgotpassword && (
        <div className="  flex items-center py-8 justify-center h-full">
          <div className="flex flex-col">
            <label htmlFor="email">Enter your email:</label>
            <input
              type="text"
              id="email"
              className="w-[800px] p-4 border-b outline-none placeholder:text-sm"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => Setemail(e.target.value)}></input>
            <div className="flex  mt-5 gap-6">
              <Button name="Submit" handleOnclick={handleForgotPassword} />
              <Button
                name="Back"
                handleOnclick={() => setisForgotpassword(false)}
              />
            </div>
          </div>
        </div>
      )}
      <div className=" top-0 bottom-0 left-0 righ-1/2 items-center justify-center flex bg-white rounded shadow-lg p-4 px-4 md:p-8 w-full lg:w-main mt-[70px] mb-[70px]">
        <div className=" mt-5 mb-5 rounded-md flex items-center flex-col w-[100%] md:w-[70%] lg:w-[50%] justify-center">
          <h1 className="text-[28px] font-semibold text-main mb-8">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <div className="w-full">
              <Inputfields
              
                value={payload.firstname}
                setValue={setpayload}
                nameKey="firstname"
                invalidFields={invalidFields}
                setinvalidFields={setinvalidFields}
                
              />
              <Inputfields
                value={payload.lastname}
                setValue={setpayload}
                nameKey="lastname"
                invalidFields={invalidFields}
                setinvalidFields={setinvalidFields}
              />
              <Inputfields
                value={payload.mobile}
                setValue={setpayload}
                nameKey="mobile"
                invalidFields={invalidFields}
                setinvalidFields={setinvalidFields}
              />
              <Inputfields
                value={payload.address}
                setValue={setpayload}
                nameKey="address"
                invalidFields={invalidFields}
                setinvalidFields={setinvalidFields}
              />
            </div>
          )}
          <Inputfields
            value={payload.email}
            setValue={setpayload}
            nameKey="email"
            type='email'
            invalidFields={invalidFields}
            setinvalidFields={setinvalidFields}
          />
          <Inputfields
            type="password"
            value={payload.password}
            setValue={setpayload}
            nameKey="password"
            invalidFields={invalidFields}
            setinvalidFields={setinvalidFields}
          />
          <Button
            name={isRegister ? "Register" : "Login"}
            handleOnclick={handleSubmit}
            fw
          />
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <span
                onClick={() => setisForgotpassword(true)}
                className="text-black-500 hover:underline cursor-pointer">
                Forgot your account?
              </span>
            )}
            {!isRegister && (
              <span
                onClick={() => setisRegister(true)}
                className="text-black-500 hover:underline cursor-pointer">
                Create account
              </span>
            )}
            {isRegister && (
              <span
                onClick={() => setisRegister(false)}
                className="text-black-500 hover:underline cursor-pointer w-full text-center">
                Login
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
