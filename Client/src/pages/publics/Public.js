import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation,TopHeader,Footer , Sidebar} from "../../components";

const Public = () => {
  return (
    <div className='w-full flex flex-col items-center'>
      <TopHeader />
     
      <Header />
      <Navigation />
      <Sidebar/>
      <div className='w-[100%]'>
        <Outlet/>
      </div>
      <Footer />
    </div>
  );
};

export default Public;
