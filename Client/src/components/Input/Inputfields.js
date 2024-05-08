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
    <div className={clsx("flex flex-col h-auto gap-2 relative w-full mb-5", withfull && 'w-full')}>
       {!isHidelabel && value?.trim() !== '' && <label className="text-[10px] absolute top-0 " htmlFor={nameKey}>{nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}</label>}
      <input
        className={clsx("h-[50px] border mt-4 rounded px-4 w-full bg-gray-50" ,style)}
        type={type || "text"}
        placeholder={ placeholder || nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)
        }
        value={value}
        onChange={e => setValue(prev=> ({...prev, [nameKey]: e.target.value}))}
        onFocus={() => setinvalidFields([])}
        ></input>
        <div className="w-full justify-end flex absolute bottom-[-20px]">
        {invalidFields?.some(el => el.name === nameKey) && <small className="text-main text-[13px] italic w-auto ">{invalidFields.find(el => el.name === nameKey)?.mes}</small>}
        </div>
    </div>
  );
};

export default Inputfields;
