import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({component: Component, token}) => {
  if(token){
    return <Component/>
  }else{
    return <Navigate to={"/"}/>
  }
};
