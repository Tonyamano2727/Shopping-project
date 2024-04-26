import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { Button, InputForm } from "../../components";
import { useSelector } from "react-redux";
import moment from 'moment'

const Personal = () => {
  const {current} = useSelector(state => state.user)
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      mobile: current?.mobile,
      email: current?.email,
      avatar: current?.avatar,
    })
  },[current])
  const handleUpdateinfor = (data) => {
    console.log(data);
  } 
  return (
    <div className="w-full p-4 flex relative flex-col ">
      <header className="text-3xl w-full font-semibold py-4 border-b border-b-blue-500">
        Personal
      </header>
      <form onSubmit={handleSubmit(handleUpdateinfor)} className="w-[60%] mx-auto flex flex-col py-8 gap-4">
        <InputForm
          label="Firstname"
          register={register}
          errors={errors}
          id="firstname"
          validate={{
            required: "Need fill this field",
          }}
        />
        <InputForm
          label="Lastname"
          register={register}
          errors={errors}
          id="lastname"
          validate={{
            required: "Need fill this field",
          }}
        />
        <InputForm
          label="Email address"
          register={register}
          errors={errors}
          id="email"
          validate={{
            required: "Need fill this field",
          }}
        />
        <InputForm
          label="Phone"
          register={register}
          errors={errors}
          id="mobile"
          validate={{
            required: "Need fill this field",
          }}
        />
        <div className="flex items-center gap-2"> 
            <span className='font-medium'>Account status : </span>
            <span>{current?.isBlocked ? 'Blocked' : 'Actived'}</span>
        </div>
        <div className="flex items-center gap-2"> 
            <span className='font-medium'>Role : </span>
            <span>{+current?.role === 1945 ? 'Admin' : 'User'}</span>
        </div>
        <div className="flex items-center gap-2"> 
            <span className='font-medium'>Create At : </span>
            <span>{moment(current?.createdAt).format("DD/MM/YYYY")}</span>
        </div>
        <Button type="submit">Update information</Button>
      </form>
    </div>
  );
};

export default Personal;
