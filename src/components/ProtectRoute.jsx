import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if auth state has been initialized
    if (isLoggedIn !== null) {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  if (isLoading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;