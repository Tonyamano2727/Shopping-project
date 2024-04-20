import React from 'react'
import clsx from 'clsx'
const InputForm = ({label , disabled , register , errors , id , validate, type='text' , placeholder , fullwith , defaultValue}) => {
  return (
    <div className='flex flex-col h-[78px] gap-2'>
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} 
      id={id}
      {...register(id, validate)}
      disabled={disabled}
      placeholder={placeholder}
      className={clsx('form-input' , fullwith && 'w-[90%]')}
      defaultValue={defaultValue}
      ></input>
      {errors[id] && <small className='text-xs text-red-500'>{errors[id]?.message}</small>}
    </div>
  )
}

export default InputForm
