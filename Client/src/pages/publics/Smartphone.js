import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../../apis/products";
import { Productcategory } from "../../components";


const Smartphone = () => {
    const [products, setProducts] = useState(null);
    const fectchProducts = async () => {
      const [phonetResponse] =
        await Promise.all([
          apiGetProducts({ sort: "category", category: "Smartphone" }),
        ]);
      if (phonetResponse?.success) {
        setProducts(phonetResponse.products);
      }
    };
    useEffect(() => {
      fectchProducts();
    }, []);
   
  return (
    <>
      <div className="w-full mt-8 flex">
        <div className="w-full pb-8 flex">
          <div className="w-[100%] justify-center flex">
            <div className="grid grid-cols-4">
                {products?.map((el) => (
                  <Productcategory
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


