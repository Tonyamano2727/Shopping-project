import React from "react";

const Button = ({ name, handleOnclick, style, iconsBofore, iconsAfter , fw}) => {
  return (
    <div>
      <button
        type="button"
        className={
          style
            ? style
            : `px-4 py-2 rounded-md text-white bg-main text-semibold ${fw ? 'w-full' : 'w-fit'}`
        }
        onClick={() => {
            handleOnclick && handleOnclick()
        }}
        >
        {iconsBofore}
        <span>{name}</span>
        {iconsAfter}
      </button>
    </div>
  );
};

export default Button;
