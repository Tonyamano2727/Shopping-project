import React, { useEffect, useState, useCallback } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import {
  Breadcrumb,
  Product,
  Search,
  Selectinput,
  Pagination,
  InputForm,
} from "../../components";
import { apiGetProducts } from "../../apis";
import Masonry from "react-masonry-css";
import { sorts } from "../../ultils/contants";
import { useForm } from "react-hook-form";


const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const [products, setproducts] = useState(null);

  const [activedclick, setactivedclick] = useState(null);

  const [params] = useSearchParams();
  const [sort, setsort] = useState("");
  const navigate = useNavigate();
  const fetchProductsByCategory = async ({ queries, category }) => {
    const categoriesMap = {
      smartphone: "smartphone",
      television: "television",
      accessories: "accessories",
      speaker: "speaker",
      headphone: "headphone",
      tablet: "tablet",
      laptop: "laptop",
    };
    if (categoriesMap.hasOwnProperty(category)) {
      queries.category = categoriesMap[category];
    }

    const response = await apiGetProducts(queries);
    if (response.success) {
      setproducts(response);
    }
  };

  // Search 

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    const { q } = data;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams({
        ...Object.fromEntries(params),
        q,
      }).toString(),
    });
  };



  const { category } = useParams();
  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    let priceQuery = {};

    for (let i of params) queries[i[0]] = i[1];
    if (queries.to && queries.from) {
      priceQuery = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
      delete queries.price;
    }
    if (queries.from) queries.price = { gte: queries.from };
    if (queries.to) queries.price = { lte: queries.to };
    delete queries.to;
    delete queries.from;
    fetchProductsByCategory({ priceQuery, queries, category });
  }, [params, category]);

  // window.scrollTo(0, 0);

  const ChangeActiveFilter = useCallback(
    (name) => {
      if (activedclick === name) setactivedclick(null);
      else setactivedclick(name);
    },
    [activedclick]
  );

  const changeValue = useCallback(
    (value) => {
      setsort(value);
    },
    [sort]
  );
  useEffect(() => {
    if (sort) {
      navigate({
        // pathname: `/${category}`,
        search: createSearchParams({
          sort,
        }).toString(),
      });
    }
  }, [sort]);

  return (
    <div className="w-full">
      <div className="h-[81px flex justify-center ">
        <div className="md:w-main w-auto mt-[50px] md:mt-5">
          <span className="text-[30px] font-medium uppercase">{category}</span>
          <Breadcrumb category={category} />
        </div>
      </div>
      <div className="flex w-full justify-end items-center ">
        <form className="w-full flex justify-center" onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            id="q"
            register={register}
            errors={errors}
            style={'p-6 w-full xl:w-[96%] flex justify-center items-center'}
            placeholder="Search product by title"
          />
        </form>
      </div>
      <div className="xl:w-main  border p-4 flex justify-between mt-8 m-auto flex-wrap">
        <div className="md:w-3/5 lg:w-4/5 flex-auto flex flex-col gap-3">
          <span className="font-semibold text-sm">Filter by</span>
          <div className="flex items-center gap-4">
            <Search
              name="price"
              activedclick={activedclick}
              ChangeActiveFilter={ChangeActiveFilter}
              type="input"
            />
            <Search
              name="color"
              activedclick={activedclick}
              ChangeActiveFilter={ChangeActiveFilter}
            />
          </div>
        </div>
        <div className="md:w-[30%] lg:w-1/5 flex flex-col gap-3 ">
          <span className="font-semibold text-sm">Sort by</span>
          <div className="w-full">
            <Selectinput
              changeValue={changeValue}
              value={sort}
              options={sorts}
            
            />
          </div>
        </div>
      </div>
      <div className="mt-8 xl:w-main  m-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {products?.products?.map((el) => (
            <Product key={el._id} pid={el._id} productData={el} />
          ))}
        </Masonry>
      </div>
      <div className="xl:w-main m-auto my-4 flex justify-end">
        <Pagination totalCount={products?.counts} />
      </div>
    </div>
  );
};

export default Products;
