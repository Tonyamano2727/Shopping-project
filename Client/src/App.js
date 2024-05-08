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
  Detailcart,
  Resetpassword,
} from "./pages/publics";
import {
  AdminLayout,
  CreateProducts,
  ManageOrder,
  Manageuser,
  ManageProducts,
} from "./pages/admin";
import {MemberLayout , Personal , Orderhistory ,Mycart,Mywhistlist , Checkout } from "./pages/Member"

import path from "./ultils/path";
import { getCategory } from "./store/app/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Cart from "./components/Cart/Cart";
import "react-toastify/dist/ReactToastify.css";
import { Showcart } from "./store/app/appslice";
function App() {
  const dispath = useDispatch();
  useEffect(() => {
    dispath(getCategory());
  }, [dispath]);
  const {isShowCart} = useSelector(state => state.app)
  return (
    <div className="relative font-main overflow-hidden ">
      {isShowCart && <div onClick={() => dispath(Showcart())} className='absolute min-h-screen bg-box  inset-0 bg-overplay z-50 flex justify-end'>
        <Cart/>
      </div>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.BLOGS} element={<Blogs />}></Route>
          <Route
            path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE}
            element={<Detailproducts />}></Route>
          <Route path={path.FAQ} element={<FAQ />}></Route>
          <Route path={path.OUR_SERVICES} element={<Service />}></Route>
          <Route path={path.PRODUCTS_CATEGORY} element={<Products />}></Route>
          <Route path={path.RESET_PASSWORD} element={<Resetpassword />}></Route>
          <Route path={path.LOGIN} element={<Login />}></Route>
          <Route path={path.DETAIL_CART} element={<Detailcart />}></Route>
          <Route path={path.CHECK_OUT} element={<Checkout />}></Route>
          <Route path={path.PERSONAL} element={<Personal />}></Route>
          <Route path={path.WISHLIST} element={<Mywhistlist />}></Route>
          <Route path={path.HISTORY} element={<Orderhistory />}></Route>
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          {/* <Route path={path.DASHBOARD} element={<Dashboard />}></Route> */}
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />}></Route>
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />}></Route>
          <Route path={path.MANAGE_USER} element={<Manageuser />}></Route>
          <Route path={path.CREATE_PRODUCTS} element={<CreateProducts />}></Route>
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.MY_CART} element={<Mycart />}></Route>
          
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
