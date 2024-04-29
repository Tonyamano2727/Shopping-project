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
    <div className={clsx("w-full relative flex-col flex mb-5", withfull && 'w-full')}>
       {/* {!isHidelabel && value?.trim() !== '' && <label className="text-[10px] absolute top-0 " htmlFor={nameKey}>{nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}</label>} */}
      <input
        className={clsx("w-full px-4 py-3 mb-5 rounded-sm border outline-none placeholder:text-gay-600 " ,style)}
        type={type || "text"}
        placeholder={ placeholder || nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)
        }
        value={value}
        onChange={e => setValue(prev=> ({...prev, [nameKey]: e.target.value}))}
        onFocus={() => setinvalidFields([])}
        ></input>
        <div className="w-full justify-end flex absolute bottom-0">
        {invalidFields?.some(el => el.name === nameKey) && <small className="text-main text-[13px] italic w-auto ">{invalidFields.find(el => el.name === nameKey)?.mes}</small>}
        </div>
    </div>
  );
};

export default Inputfields;
