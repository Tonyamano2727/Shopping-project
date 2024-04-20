import React,{useEffect , useState} from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import icons from "../../ultils/icons";

const { GrFormNext } = icons;
const Breadcrumb = ({title , category}) => {
  const routes = [
    { path: "/:category", breadcrumb: category },
  { path: "/", breadcrumb: "Home" },
  { path: "/:category/:pid/:title", breadcrumb: title},
  ]
    const breadcrumb = useBreadcrumbs(routes)
  return (
    <div className='text-[15px] flex '>
      {breadcrumb?.filter(el => !el.match.route === false).map(({ match, breadcrumb },index,self) => (
        <Link className="flex  items-center hover:text-main" key={match.pathname} to={match.pathname}>
          <span>{breadcrumb}</span> 
          {index !== self.length - 1 && <GrFormNext/>}
        </Link>
      ))}
    </div>
  )
}

export default Breadcrumb
