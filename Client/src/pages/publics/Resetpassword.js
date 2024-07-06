import React,{useState} from "react";
import { Button } from "../../components";
import { useParams } from "react-router-dom";
import { apiResetPassword } from "../../apis/user";
import { toast } from "react-toastify";
const Resetpassword = () => {
  const [password, setpassword] = useState('')
  const {token} = useParams()
  console.log(token);
  const handleResetPassword = async () =>{
    const response = await apiResetPassword({password,token});
    toast.info(response.mes)
  }
  return (
    <div className=" flex items-center z-50 py-8 justify-center h-full">
      <div className="flex flex-col">
        <label htmlFor="password">Enter new your password : </label>
        <input
          type="password"
          id="password"
          className="w-[800px] p-4 border-b outline-none placeholder:text-sm"
          placeholder="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}></input>
        <div className="flex items-center justify-center mt-5">
          <Button name="Submit" handleOnclick={handleResetPassword} />
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
