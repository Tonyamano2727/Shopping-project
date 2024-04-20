import React, { useEffect, useState , useCallback} from "react";
import { apigetuser } from "../../apis/user";
import {roles} from '../../ultils/contants'
import moment from 'moment'
import {Inputfields} from '../../components'
import useDebounce from "../../hooks/useDebounce";

const Manageuser = () => {
  const [users, setUsers] = useState(null);
  const [queries, setqueries] = useState({
      q : ""
  })
  
  const fetchUser = async (params) => {
    const response = await apigetuser(params);
    if (response.success) setUsers(response.users);
  };

  const queriesDebounce = useDebounce(queries.q , 800)

  useEffect(() => {
    const params = {}
    if (queriesDebounce) params.q = queriesDebounce
    fetchUser(params);
  }, [queriesDebounce]);


  console.log(queries.q);
  return (
    <div className="w-full">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b">
        <span>Manage user</span>
      </h1>
      <div className="w-full p-4">
        <div className="flex justify-end py-4 w-full">
          <Inputfields style={'w500'}
          nameKey={'q'}
          value={queries.q}
          setValue={setqueries}
          placeholder = 'Search name or email user...'
          isHidelabel
          />
        </div>
        <table className="table-auto mb-6 text-left w-full">
          <thead className="font-bold bg-gray-700 text-[13px] boder border-gray-300 text-center text-white"> 
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Email address</th>
              <th className="px-4 py-2">Fullname</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">CreatedAt</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center text-sm">
            {users?.map((el, idx) => (
              <tr key={el._id} className="border border-gray-500">
                <td className="py-2 px-4">{idx + 1}</td>
                <td className="py-2 px-4">{el.email}</td>
                <td className="py-2 px-4">{`${el.lastname} ${el.firstname}`}</td>
                <td className="py-2 px-4">{roles.find(role => +role.code === +el.code)?.value}</td>
                <td className="py-2 px-4">{el.mobile}</td>
                <td className="py-2 px-4">{el.isBlocked ? 'Blocked' : 'Actived'}</td>
                <td className="py-2 px-4">{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                <td className="py-2 px-4">
                  <span className="px-2 text-orange-500 hover:underline cursor-pointer">Edit</span>
                  <span className="px-2 text-orange-500 hover:underline cursor-pointer">Edit</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manageuser;
