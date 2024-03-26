import React,{useEffect} from 'react';
import {Route, Routes} from 'react-router-dom'
import {Home,Login,Public,FAQ,Service,Detailproducts,Blogs,Products} from './pages/publics'
import path from './ultils/path';
import {getCategory} from './store/asyncAction';
import {useDispatch} from 'react-redux'
function App() {
  const dispath = useDispatch()
  useEffect(() => {
    dispath(getCategory())
  },[])
  return (
    <div className="min-h-screen font-main overflow-y-auto ">
        <Routes>
          <Route path={path.PUBLIC} element={<Public/>}>
            <Route path={path.HOME} element={<Home/>}></Route>
            <Route path={path.BLOGS} element={<Blogs/>}></Route>
            <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<Detailproducts/>}></Route>
            <Route path={path.FAQ} element={<FAQ/>}></Route>
            <Route path={path.OUR_SERVICES} element={<Service/>}></Route>
            <Route path={path.PRODUCTS} element={<Products/>}></Route>
          </Route>
          <Route path={path.LOGIN} element={<Login/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
