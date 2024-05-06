import React from "react";
import clsx from "clsx";
const InputForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  fullwith,
  defaultValue,
  style,
  value ,
  setValue,
}) => {
  return (
    <div className={clsx("flex flex-col h-auto gap-2", style)}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx("h-10 border mt-1 rounded px-4 w-full bg-gray-50", fullwith && "w-[100%]", style)}
        defaultValue={defaultValue}></input>
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default InputForm;
