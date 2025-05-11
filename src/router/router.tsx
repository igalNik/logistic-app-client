import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import AppLayout from '../features/AppLayout';
import Departments from '../pages/Departments';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';
import { protectedLoader } from './protectedLoader';
import Solders from '../pages/solders/Solders';
import { soldersLoader } from '../features/solders/components/loaders/solders.loader';
const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        loader: protectedLoader,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/home',
            element: <Home />,
          },
          {
            path: '/solders',
            element: <Solders />,
            loader: soldersLoader,
          },
          {
            path: '/departments',
            element: <Departments />,
          },
          { path: '*', element: <PageNotFound /> },
        ],
      },
    ],
  },
  { path: '/login', element: <Login /> },
]);

export default router;
