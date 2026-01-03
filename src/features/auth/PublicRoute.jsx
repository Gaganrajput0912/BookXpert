import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from './authSlice';

const PublicRoute = () => {
  const { isAuthenticated } = useSelector(selectAuth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
