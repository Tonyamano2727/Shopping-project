import React from "react";

const Button = ({children, handleOnclick, style, fw ,name , type = 'button'}) => {
  return (
    <div className="w-full justify-center flex">
      <button
        type={type}
        className={
          style
            ? style
            : `px-4 py-2 rounded-md text-white bg-main text-semibold ${
                fw ? "w-full" : "w-fit"
              }`
        }
        onClick={() => {
          handleOnclick && handleOnclick();
        }}>
       {children}
       {name}
      </button>
    </div>
  );
};

export default Button;
