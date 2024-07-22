import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/auth" />;
  }

  const userRoles = user.roles.map(role => role.name);
  const hasAccess = allowedRoles.some(role => userRoles.includes(role));

  return hasAccess ? children : <Navigate to="/" />;
};

export default PrivateRoute;
