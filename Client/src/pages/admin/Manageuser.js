import React, { useEffect, useState, useCallback } from "react";
import {
  apigetuser,
  apiupdateUserbyadmin,
  apideleteUser,
} from "../../apis/user";
import { roles } from "../../ultils/contants";
import moment from "moment";
import { Inputfields, InputForm, Button, Pagination } from "../../components";
import useDebounce from "../../hooks/useDebounce";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
const Manageuser = () => {
  const [invalidFields, setinvalidFields] = useState(null);
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
  const [Update, setUpdate] = useState(false);
  const [EditEl, setEditEl] = useState(null);

  const fetchUser = async (params) => {
    const response = await apigetuser({
      ...params,
      limit: process.env.REACT_APP_PRODUCT_LIMIT,
    });
    if (response.success) setUsers(response.users);
  };

  const render = useCallback(() => {
    setUpdate(!Update);
  }, [Update]);

  const queriesDebounce = useDebounce(queries.q, 800);

  useEffect(() => {
    const params = {};
    if (queriesDebounce) params.q = queriesDebounce;
    fetchUser(params);
  }, [queriesDebounce, Update]);

  const handleUpdate = async (data) => {
    const response = await apiupdateUserbyadmin(data, EditEl._id);
    if (response.success) {
      setEditEl(null);
      render();
      toast.success(response.mes);
    } else toast.error(response.mes);
  };

  const deleteUser = (uid) => {
    Swal.fire({
      title: "Are you sure",
      text: "Are you ready remove this user",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apideleteUser(uid);
        if (response.success) {
          render();
          toast.success(response.mes);
        } else toast.error(response.mes);
      }
    });
  };
  return (
    <div className="w-full">
      <div className="p-4 w-full flex  flex-col">
        <h1 className="text-3xl font-semibold tracking-tight ">Manageuser</h1>
        <p>Let's grow to your business! Create your product and upload here</p>
      </div>
      <div className="w-full">
        <div className="flex justify-end w-[100%] px-8">
          <Inputfields
            style={"w500"}
            nameKey={"q"}
            value={queries.q}
            setValue={setqueries}
            placeholder="Search name or email user..."
            isHidelabel
            setinvalidFields={setinvalidFields}
          />
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <table className="table-auto mb-6 text-left w-full">
            <thead className="font-bold border border-black text-center">
              <tr>
                <th className="gap-x-2 items-center text-red-500 hover:text-indigo-600 ">
                  #
                </th>
                <th className="gap-x-2 items-center  text-gray-500 hover:text-red-600 ">
                  Email address
                </th>
                <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">
                  Firstname
                </th>
                <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">
                  Lastname
                </th>
                <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">
                  Role
                </th>
                <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">
                  Phone
                </th>
                <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">
                  Status
                </th>
                <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">
                  CreatedAt
                </th>
                <th className="gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-red-600 ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-center text-sm ">
              {users?.map((el, idx) => (
                <tr key={el._id} className="border border-gray-500 ">
                  <td className="py-2 px-4 w-[10px] h-[100px]">{idx + 1}</td>
                  <td className="py-2 px-4 ">
                    {EditEl?._id === el._id ? (
                      <InputForm
                        register={register}
                        defaultValue={EditEl?.email}
                        errors={errors}
                        fullwith
                        id={"email"}
                        validate={{
                          required: "Required fill",
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
                        validate={{ required: "Required fill" }}
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
                        validate={{ required: "Required fill" }}
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
                        validate={{ required: "Required fill" }}
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
                    <div className="flex justify-center items-center">
                      {EditEl?._id === el._id ? (
                        <span
                          onClick={() => setEditEl(null)}
                          className="px-2 hover:underline cursor-pointer">
                          <IoReturnUpBackOutline size={20} color="blue"/>
                        </span>
                      ) : (
                        <span
                          onClick={() => setEditEl(el)}
                          className="px-2 hover:underline cursor-pointer">
                          <FaEdit size={20} color="blue"/>
                        </span>
                      )}
                      <span
                        onClick={() => deleteUser(el._id)}
                        className="px-2 text-orange-500 hover:underline cursor-pointer">
                        <RiDeleteBin6Line size={20} />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {EditEl && (
            <Button fw type="submit">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Manageuser;
