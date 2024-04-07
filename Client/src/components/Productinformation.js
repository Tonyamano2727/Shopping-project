import React, { useState } from "react";
import { Productinfortabs, productExtraif } from "../ultils/contants";

const ActivedStyle = "";
const notActivedStyles = "";
const Productinformation = () => {
  const [activedtab, setactivedtab] = useState(1);
  return (
    <div className="mt-9">
      <div className="gap-2 flex items-center">
        {Productinfortabs.map((el) => (
          <span
            className={`cursor-pointer p-2 px-4 ${
              activedtab === +el.id
                ? "bg-white border border-b-0"
                : "bg-gray-200"
            }`}
            onClick={() => setactivedtab(el.id)}
            key={el.id}>
            {el.title}
          </span>
        ))}
      </div>
      <div className="w-full h-[300px] border p-3">
      {Productinfortabs.some(el => el.id === activedtab) && Productinfortabs.find(el => el.id === activedtab)?.content}
      </div>
    </div>
  );
};

export default Productinformation;
