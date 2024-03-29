// import React from 'react'

// const Smartphone = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Smartphone
import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../../apis/products";
import { Product } from "../../components";


const Smartphone = () => {
    const [products, setProducts] = useState(null);
    const fectchProducts = async () => {
      const [ tabletResponse] =
        await Promise.all([
          apiGetProducts({ sort: "category", category: "Smartphone" }),
        ]);
      if (tabletResponse?.success) {
        setProducts(tabletResponse.products);
      }
    };
    useEffect(() => {
      fectchProducts();
    }, []);
   
  return (
    <>
      <div className="w-full flex">
        <div className="w-full pb-8 flex">
          <div className="w-[100%] flex">
            <div className="mt-4 flex">
                {products?.map((el) => (
                  <Product
                    key={el.id}
                    pid={el.id}
                    productData={el}
                  />
                ))}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Smartphone;

