import { Navigate, Outlet, redirect } from 'react-router-dom';

import { useMe } from '../api/queries';
import Spinner from './Spinner';

const ProtectedRoute = () => {
  const { data: user, isLoading, error } = useMe();
  try {
    if (error) throw error;
    if (isLoading) return <Spinner type={'page'}></Spinner>;
    return user ? <Outlet /> : <Navigate to="/login" replace />;
  } catch (error: any) {
    if (error.message.includes('401')) {
      return redirect('/login');
    }
    throw error; // Will be handled by errorElement
  }
};

export default ProtectedRoute;
