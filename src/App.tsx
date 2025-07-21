import { RouterProvider } from 'react-router-dom';
import './App.css';

import router from './router/router';
import ErrorBoundary from './components/ErrorBoundary';
import CustomErrorScreen from './components/CustomErrorScreen';

function App() {
  return (
    <ErrorBoundary fallback={<CustomErrorScreen />}>
      <RouterProvider router={router}></RouterProvider>;
    </ErrorBoundary>
  );
}

export default App;
