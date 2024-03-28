import React, { useState, useCallback } from "react";
import { Inputfields, Button } from "../../components";
import { apiRegister, apiLogin, apiForgotPassword } from "../../apis/user";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { register } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [payload, setpayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });

  const [isRegister, setisRegister] = useState(false);
  const [isForgotpassword, setisForgotpassword] = useState(false);
  const resetPayLoad = () => {
    setpayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
    });
  };
  const [email, Setemail] = useState('');
  const handleForgotPassword = async () => {
      const response = await apiForgotPassword({email : email})
      console.log(response)
  };
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;
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
          register({
            isLoggedIn: true,
            token: rs.Accesstoken,
            userData: rs.userData,
          })
        );
        navigate(`/${path.HOME}`);
      } else {
        Swal.fire("Oops", rs.mes, "eroor");
      }
    }
  }, [payload, isRegister]);

  return (
    <div className="w-screen h-screen relative">
      <div className="absolute top-0 left-0 right-0 bg-white flex items-center py-8 justify-center z-50 h-full">
        <div className="flex flex-col">
          <label htmlFor="email">Enter your email:</label>
          <input
            type="text"
            id="email"
            className="w-[800px] p-4 border-b outline-none placeholder:text-sm"
            placeholder="email@gmail.com"
            value={email}
            onChange={e=>Setemail(e.target.value)}
            ></input>
          <div className="flex items-center justify-center mt-5">
            <Button name='Submit' handleOnclick={handleForgotPassword} />
          </div>
        </div>
      </div>
      {/* <img src='https://th.bing.com/th/id/OIP.5Hnu1ejWN1hvIaK8p2yeNAHaEK?w=300&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' alt='' className='w-full h-full object-cover'></img> */}
      <div className="absolute top-0 bottom-0 left-0 righ-1/2 items-center justify-center flex">
        <div className="p-8 bg-slate-500 rounded-md flex items-center flex-col min-w-[500px] s">
          <h1 className="text-[28px] font-semibold text-main mb-8">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <div className="w-full">
              <Inputfields
                value={payload.firstname}
                setValue={setpayload}
                nameKey="firstname"
              />
              <Inputfields
                value={payload.lastname}
                setValue={setpayload}
                nameKey="lastname"
              />
            </div>
          )}
          <Inputfields
            value={payload.email}
            setValue={setpayload}
            nameKey="email"
          />
          {isRegister && (
            <Inputfields
              value={payload.mobile}
              setValue={setpayload}
              nameKey="mobile"
            />
          )}
          <Inputfields
            type="password"
            value={payload.password}
            setValue={setpayload}
            nameKey="password"
          />
          <Button
            name={isRegister ? "Register" : "Login"}
            handleOnclick={handleSubmit}
            fw
          />
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <span className="text-black-500 hover:underline cursor-pointer">
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
