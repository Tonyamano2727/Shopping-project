import React from "react";

const Inputfields = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setinvalidFields,
}) => {
  return (
    <div className="w-full relative">
      {value.trim() !== '' && <label className="text-[10px] absolute top-0 " htmlFor={nameKey}>{nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}</label>}
      <input
        className="w-full px-4 py-3 rounded-sm outline-none placeholder:text-gay-600 my-4"
        type={type || "text"}
        placeholder={
          nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)
        }
        value={value}
        onChange={e => setValue(prev=> ({...prev, [nameKey]: e.target.value}))}
        
        ></input>
    </div>
  );
};

export default Inputfields;
