// import React, { useEffect, useState } from "react";
// import { apiGetProducts } from "../../apis/products";
// import { Productcategory } from "../../components";
// import {Breadcrumb} from "../../components";
// import { useParams } from "react-router-dom";

// const Laptop = () => {
//     const [products, setProducts] = useState(null);
//     const fectchProducts = async () => {
//       const [ LaptopResponse] =
//         await Promise.all([
//           apiGetProducts({ sort: "category", category: "Laptop" }),
//         ]);
//       if (LaptopResponse?.success) {
//         setProducts(LaptopResponse.products);
//       }
//     };
//     const { category } = useParams();
//     console.log(category);
//     useEffect(() => {
//       fectchProducts();
//     }, []);
   
//   return (
//     <div className="flex flex-col">
//       <div className="h-[81px flex justify-center ">
//         <div className="w-main">
//           <span className="text-[19px] font-medium uppercase">{category}</span>
//           <Breadcrumb category={category} />
//         </div>
//       </div>
//       <div className="w-full mt-8 flex">
//         <div className="w-full pb-8 flex">
//           <div className="w-[100%] justify-center flex">
//             <div className="grid grid-cols-4">
//                 {products?.map((el) => (
//                   <Productcategory
//                     key={el.id}
//                     pid={el.id}
//                     productData={el}
//                   />
//                 ))}
              
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Laptop;


import React from 'react'

const Laptop = () => {
  return (
    <div>
      
    </div>
  )
}

export default Laptop
