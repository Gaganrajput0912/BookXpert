import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from './authSlice';

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector(selectAuth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
