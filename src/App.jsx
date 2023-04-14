import React from 'react';
import LoginPage from './Pages/LoginPage/LoginPage';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './Pages/DefaultLayout';
import AdminRoutes from './Routes/AdminRoutes';
import { ProtectedRoute } from './Routes/ProtectedRoute';
import "react-confirm-alert/src/react-confirm-alert.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/" element={<ProtectedRoute component={DefaultLayout} token={"user-token"}/>}>
        {AdminRoutes.map(({path, element: Ele}, index) =>(
          <Route key={index} path={path} element={Ele}/>
        ))}
      </Route>
    </Routes>
  )
}

export default App