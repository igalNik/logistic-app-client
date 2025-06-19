import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import AppLayout from '../features/AppLayout';
import Departments from '../pages/Departments';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';
import { protectedLoader } from './protectedLoader';
import Solders from '../pages/Solders';
import { soldersLoader } from '../features/solders/loaders/solders.loader';
import EquipmentTypes from '../pages/EquipmentTypes';
import { equipmentTypesLoader } from '../features/equipment-type/loaders/equipmentType.loader';
import { inventoryWithPopulatedEquipmentTypeLoader } from '../features/inventory/loaders/inventory.loader';
import Inventory from '../pages/Inventory';
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
          {
            path: '/equipment-types',
            element: <EquipmentTypes />,
            loader: equipmentTypesLoader,
          },
          {
            path: '/inventory',
            element: <Inventory />,
            loader: inventoryWithPopulatedEquipmentTypeLoader,
          },
          { path: '*', element: <PageNotFound /> },
        ],
      },
    ],
  },
  { path: '/login', element: <Login /> },
]);

export default router;
