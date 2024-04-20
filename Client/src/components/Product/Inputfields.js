import React from "react";
import clsx from "clsx";

const Inputfields = ({
  value,
  setValue,
  nameKey,
  type,
  style,
  invalidFields,
  setinvalidFields,
  withfull,
  placeholder,isHidelabel
}) => {
  return (
    <div className={clsx("w-full relative", withfull && 'w-full')}>
      {!isHidelabel && value?.trim() !== '' && <label className="text-[10px] absolute top-0 " htmlFor={nameKey}>{nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}</label>}
      <input
        className={clsx("w-full px-4 py-3 rounded-sm outline-none placeholder:text-gay-600 my-4" ,style)}
        type={type || "text"}
        placeholder={ placeholder || nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)
        }
        value={value}
        onChange={e => setValue(prev=> ({...prev, [nameKey]: e.target.value}))}
        ></input>
    </div>
  );
};

export default Inputfields;
