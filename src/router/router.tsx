import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import AppLayout from '../features/AppLayout';
import Departments from '../pages/Departments';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';
import { protectedLoader } from './protectedLoader';
import Inventory from '../pages/Inventory';

import EquipmentTypes from './../pages/EquipmentTypes';
import Users from './../pages/Users';
import Signatures from './../pages/Signatures';
import CustomErrorScreen from './../components/CustomErrorScreen';
const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    errorElement: <CustomErrorScreen />,

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
            path: '/users',
            element: <Users />,
          },
          {
            path: '/departments',
            element: <Departments />,
          },
          {
            path: '/equipment-types',
            element: <EquipmentTypes />,
          },
          {
            path: '/inventory',
            element: <Inventory />,
          },
          {
            path: '/signatures',
            element: <Signatures />,
          },
          { path: '*', element: <PageNotFound /> },
        ],
      },
    ],
  },
  { path: '/login', element: <Login /> },
]);

export default router;
