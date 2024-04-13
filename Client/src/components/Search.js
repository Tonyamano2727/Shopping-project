import React, { useEffect, useState } from "react";
import icons from "../ultils/icons";
import { colors } from "../ultils/contants";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import path from "../ultils/path";

const { FaAngleDown } = icons;

const Search = ({
  name,
  activedclick,
  ChangeActiveFilter,
  type = "checkbox",
}) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selected, setselected] = useState([]);

  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl)
      setselected((prev) => prev.filter((el) => el !== e.target.value));
    else setselected((prev) => [...prev, e.target.value]);
    ChangeActiveFilter(null);
  };

  useEffect(() => {
    if (selected.length > 0) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          color: selected.join(","),
        }).toString(),
      });
    } else {
      navigate(`/${category}`);
    }
  }, [selected]);
  return (
    <div
      className="p-4 cursor-pointer text-gray-800 gap-6 text-xs relative border w-auto border-gray-400 flex justify-between items-center"
      onClick={() => ChangeActiveFilter(name)}>
      <span className="capitalize">{name}</span>
      <FaAngleDown />
      {activedclick === name && (
        <div className="absolute top-full left-0 w-fit p-4 border z-20 bg-white">
          {type === "checkbox" && (
            <div className="p-2">
              <div className="p-4 items-center flex justify-center gap-8">
                <span className="whitespace-nowrap">
                  {`${selected.length} selected`}
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setselected([]);
                  }}
                  className="underline cursor-pointer hover:text-main">
                  Reset
                </span>
              </div>
              <div className="flex flex-col justify-center">
                {colors.map((el, index) => (
                  <div className="flex gap-2 mt-2" key={index}>
                    <input
                      className="w-4 h-4   text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                      onChange={handleSelect}
                      id={el}
                      value={el}
                      type="checkbox"
                      checked={selected.some(
                        (selectedItem) => selectedItem === el
                      )}
                    />
                    <label className="capitalize text-gray-700" htmlFor={el}>
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

