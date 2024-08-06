import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // Adjust the path as needed

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Assuming useAuth provides the authenticated user

  // Redirect to login if user is not authenticated
  if (!user) {
    console.log("HIIIIII");
    return <Navigate to="/login" />;
  }

  return children; // Render the children if authenticated
};

export default ProtectedRoute;
