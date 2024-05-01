import React, { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams ,useNavigate, createSearchParams} from "react-router-dom";
import { Breadcrumb, Product, Search, Selectinput , Pagination} from "../../components";
import { apiGetProducts } from "../../apis";
import Masonry from "react-masonry-css";
import { sorts } from "../../ultils/contants";


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
  const navigate = useNavigate()
  // console.log(params.entries());

  // const fetchProductsByCategory = async (queries) => {
  //   if (category === "tablet") {
  //           queries.category = "tablet";
  //         } else if (category === "laptop") {
  //           queries.category = "laptop";
  //         }
  //   const response = await apiGetProducts(queries);
  //   if (response.success) setproducts(response.products);
  // };
  const fetchProductsByCategory = async ({ queries, category }) => {
    if (category === "smartphone") {
      queries.category = "smartphone";
    }
    if (category === "television") {
      queries.category = "television";
    }
    if (category === "accessories") {
      queries.category = "accessories";
    }
    if (category === "speaker") {
      queries.category = "speaker";
    }
    if (category === "tablet") {
      queries.category = "tablet";
    } else if (category === "laptop") {
      queries.category = "laptop";
    }

    const response = await apiGetProducts(queries);
    if (response.success) {
      setproducts(response);
    }
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

  window.scrollTo(0 , 0)

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
    if(sort){
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          sort
        }).toString(),
      })
    }
  },[sort])
  return (
    <div className="w-full">
      <div className="h-[81px flex justify-center ">
        <div className="w-main">
          <span className="text-[30px] font-medium uppercase">{category}</span>
          <Breadcrumb category={category} />
        </div>
      </div>
      <div className="xl:w-main  border p-4 flex justify-between mt-8 m-auto">
        <div className="w-4/5 flex-auto flex flex-col gap-3">
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
        <div className="w-1/5 flex flex-col gap-3 ">
          <span className="font-semibold text-sm">Sort by</span>
          <div className="w-full">
            <Selectinput changeValue={changeValue} value={sort} options={sorts} />
          </div>
        </div>
      </div>
      <div className="mt-8 xl:w-main  m-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {products?.products?.map((el) => (
            <Product key={el._id} pid={el.id} productData={el} />
          ))}
        </Masonry>
      </div>
      <div className="xl:w-main m-auto my-4 flex justify-end">
        <Pagination totalCount={products?.counts}/>
      </div>
    </div>
  );
};

export default Products;
