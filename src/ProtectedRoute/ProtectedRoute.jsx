import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Firebase } from '../Context/ContextPage';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { User,UserLogined } = Firebase();

  
  if (!UserLogined) {
   
   navigate("/login")
  }

  
  return <>{children}</>;
};

export default ProtectedRoute;
