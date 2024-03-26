import React, { useState,useCallback } from "react";
import { Inputfields,Button } from "../../components";
const Login = () => {
  const [payload, setpayload] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isRegister, setisRegister] = useState(false)
  const handleSubmit = useCallback(() => {
    console.log(payload);
  },[payload])
  return (
    <div className="w-screen h-screen relative">
      {/* <img src='https://th.bing.com/th/id/OIP.5Hnu1ejWN1hvIaK8p2yeNAHaEK?w=300&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' alt='' className='w-full h-full object-cover'></img> */}
      <div className="absolute top-0 bottom-0 left-0 righ-1/2 items-center justify-center flex">
        <div className="p-8 bg-slate-500 rounded-md flex items-center flex-col min-w-[500px] s">
          <h1 className="text-[28px] font-semibold text-main mb-8">{isRegister? 'Register' : 'Login'}</h1>
          {isRegister && < Inputfields
            value={payload.name}
            setValue={setpayload}
            nameKey='name'
          />}
          <Inputfields
            value={payload.email}
            setValue={setpayload}
            nameKey='email'
          />
          <Inputfields
            type = 'password'
            value={payload.password}
            setValue={setpayload}
            nameKey='password'
          />
          <Button name={isRegister ? 'Register' :'Login'}
          handleOnclick={handleSubmit}
          fw
          />
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && <span className='text-black-500 hover:underline cursor-pointer'>Forgot your account?</span>}
            {!isRegister &&  <span onClick={() => setisRegister(true)} className='text-black-500 hover:underline cursor-pointer'>Create account</span>}
            {isRegister &&  <span onClick={() => setisRegister(false)} className='text-black-500 hover:underline cursor-pointer w-full text-center'>Login</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
