import React, { useEffect, useState, useCallback } from "react";
import { apigetuser , apiupdateUser , apideleteUser} from "../../apis/user";
import { roles } from "../../ultils/contants";
import moment from "moment";
import { Inputfields, InputForm , Button , Pagination} from "../../components";
import useDebounce from "../../hooks/useDebounce";
import { useForm } from "react-hook-form";
import {toast} from 'react-toastify'
import Swal from "sweetalert2";
const Manageuser = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    email: "",
    firstname: "",
    lastname: "",
    role: "",
    phone: "",
    status: "",
  });
  const [users, setUsers] = useState(null);
  const [queries, setqueries] = useState({
    q: "",
  });
  const [Update, setUpdate] = useState(false)
  const [EditEl, setEditEl] = useState(null);

  const fetchUser = async (params) => {
    const response = await apigetuser({...params , limit:process.env.REACT_APP_PRODUCT_LIMIT});
    if (response.success) setUsers(response.users);
  };

  const render = useCallback(() => {
      setUpdate(!Update)
  },[Update]
  )

  const queriesDebounce = useDebounce(queries.q, 800);

  useEffect(() => {
    const params = {};
    if (queriesDebounce) params.q = queriesDebounce;
    fetchUser(params);
  }, [queriesDebounce , Update]);

  const handleUpdate = async (data) => {
    const response = await apiupdateUser(data , EditEl._id)
    if(response.success) {
      setEditEl(null)
      render()
      toast.success(response.mes)
    }else toast.error(response.mes)
  };
  
  const deleteUser =(uid) => {
    Swal.fire({
      title: "Are you sure",
      text: "Are you ready remove this user",
      showCancelButton: true
    }).then(async(result) => {
      if(result.isConfirmed){
        const response = await apideleteUser(uid)
        if(response.success) {
          render()
          toast.success(response.mes)
        }
        else toast.error(response.mes)
      }
    }
    )
      
  }
  return (
    <div className="w-full">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b">
        <span>Manage user</span>
      </h1>
      <div className="w-full p-4">
        <div className="flex justify-end py-4 w-full">
          <Inputfields
            style={"w500"}
            nameKey={"q"}
            value={queries.q}
            setValue={setqueries}
            placeholder="Search name or email user..."
            isHidelabel
          />
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          {EditEl && <Button type='submit'>Update</Button>}
          <table className="table-auto mb-6 text-left w-full">
            <thead className="font-bold bg-gray-700 text-[13px] boder border-gray-300 text-center text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Email address</th>
                <th className="px-4 py-2">Firstname</th>
                <th className="px-4 py-2">Lastname</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">CreatedAt</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center text-sm ">
              {users?.map((el, idx) => (
                <tr key={el._id} className="border border-gray-500 ">
                  <td className="py-2 px-4">{idx + 1}</td>
                  <td className="py-2 px-4 ">
                    {EditEl?._id === el._id ? (
                      <InputForm
                        register={register}
                        defaultValue={EditEl?.email}
                        errors={errors}
                        fullwith
                        id={"email"}
                        validate={{
                          required: 'Required fill',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        }}
                      />
                    ) : (
                      <span>{el.email}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {EditEl?._id === el._id ? (
                      <InputForm
                        register={register}
                        defaultValue={EditEl?.firstname}
                        errors={errors}
                        fullwith
                        id={"firstname"}
                        validate={{ required: 'Required fill' }}
                      />
                    ) : (
                      <span>{el.firstname}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {EditEl?._id === el._id ? (
                      <InputForm
                        register={register}
                        defaultValue={EditEl?.lastname}
                        errors={errors}
                        fullwith
                        id={"lastname"}
                        validate={{ required: 'Required fill' }}
                      />
                    ) : (
                      <span>{el.lastname}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {roles.find((role) => +role.code === +el.role)?.value}
                  </td>

                  <td className="py-2 px-4">
                    {EditEl?._id === el._id ? (
                      <InputForm
                        register={register}
                        defaultValue={EditEl?.mobile}
                        errors={errors}
                        fullwith
                        id={"mobile"}
                        validate={{ required: 'Required fill' }}
                      />
                    ) : (
                      <span>{el.mobile}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {el.isBlocked ? "Blocked" : "Actived"}
                  </td>
                  <td className="py-2 px-4">
                    {moment(el.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="py-2 px-4">
                    {EditEl?._id === el._id ? <span
                      onClick={() => setEditEl(null)}
                      className="px-2 text-orange-500 hover:underline cursor-pointer">
                      Back
                    </span> : <span
                      onClick={() => setEditEl(el)}
                      className="px-2 text-orange-500 hover:underline cursor-pointer">
                      Edit
                    </span>}
                    <span onClick={()=> deleteUser(el._id)} className="px-2 text-orange-500 hover:underline cursor-pointer">
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default Manageuser;
