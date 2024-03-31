import React,{useEffect , useState} from "react";

import useBreadcrumbs from "use-react-router-breadcrumbs";
const Breadcrumb = () => {
    const breadcrumb = useBreadcrumbs()
    console.log(breadcrumb);
  return (
    <div className='text-sm'>
      Breadcrumb
    </div>
  )
}

export default Breadcrumb
