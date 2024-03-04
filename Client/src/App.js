import React from 'react';
import {Route, Routes} from 'react-router-dom'
import {Home,Login,Public} from './pages/publics'
import path from './ultils/path';

function App() {
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
