import { Navigate, Outlet } from 'react-router-dom';

import { useMe } from '../api/queries';
import Spinner from './Spinner';

const ProtectedRoute = () => {
  const { data: user, isLoading, error } = useMe();
  if (error) throw error;
  if (isLoading) return <Spinner type={'page'}></Spinner>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
