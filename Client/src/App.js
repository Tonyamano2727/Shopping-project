import React,{useEffect} from 'react';
import {Route, Routes} from 'react-router-dom'
import {Home,Login,Public} from './pages/publics'
import path from './ultils/path';
import {getCategory} from './store/asyncAction';
import {useDispatch} from 'react-redux'
function App() {
  const dispath = useDispatch()
  useEffect(() => {
    dispath(getCategory())
  },[])
  return (
    <div className="min-h-screen">
        <Routes>
          <Route path={path.PUBLIC} element={<Public/>}>
            <Route path={path.HOME} element={<Home/>}></Route>
            <Route path={path.LOGIN} element={<Login/>}></Route>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
