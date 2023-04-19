import React from 'react';
import LoginPage from './Pages/LoginPage/LoginPage';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './Pages/DefaultLayout';
import AdminRoutes from './Routes/AdminRoutes';
import SubUserRoutes from './Routes/SubUserRoutes';
import { ProtectedRoute } from './Routes/ProtectedRoute';
import "react-confirm-alert/src/react-confirm-alert.css";

function App() {
  const role = localStorage.getItem("role");
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/user" element={<ProtectedRoute component={DefaultLayout} token={"user-token"} role={role}/>}>
        {AdminRoutes.map(({path, element: Ele}, index) =>(
          <Route key={index} path={path} element={Ele}/>
        ))}
      </Route>
      <Route path="/subUser" element={<ProtectedRoute component={DefaultLayout} token={"subUser-token"} role={role}/>}>
        {SubUserRoutes.map(({path, element: Ele}, index) =>(
          <Route key={index} path={path} element={Ele}/>
        ))}
      </Route>
    </Routes>
  )
}

export default App