import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  Public,
  FAQ,
  Service,
  Detailproducts,
  Blogs,
  Products,
  Resetpassword,
  Smartphone,Tablet,Laptop,
  Speaker
} from "./pages/publics";
import path from "./ultils/path";
import { getCategory } from "./store/app/asyncAction";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const dispath = useDispatch();
  useEffect(() => {
    dispath(getCategory());
  }, [dispath]);
  return (
    <div className="min-h-screen font-main overflow-y-auto ">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.BLOGS} element={<Blogs />}></Route>
          <Route
            path={path.DETAIL_PRODUCT__PID__TITLE}
            element={<Detailproducts />}></Route>
          <Route path={path.FAQ} element={<FAQ />}></Route>
          <Route path={path.OUR_SERVICES} element={<Service />}></Route>
          <Route path={path.PRODUCTS} element={<Products />}></Route>
          <Route path={path.RESET_PASSWORD} element={<Resetpassword />}></Route>
          <Route path={path.SMART_PHONE} element={<Smartphone />}></Route>
          <Route path={path.TAB_LET} element={<Tablet />}></Route>
          <Route path={path.LAP_TOP} element={<Laptop />}></Route>
          <Route path={path.SPEAKER} element={<Speaker />}></Route>
          <Route path={path.LOGIN} element={<Login />}></Route>
        </Route>
        
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
