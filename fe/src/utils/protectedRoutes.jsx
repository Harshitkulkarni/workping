// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user);

  if (!user || !user._id) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
