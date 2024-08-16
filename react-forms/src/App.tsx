import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import UncontrolledForm from './pages/UncontrolledForm/UncontrolledForm';
import ReactHookForm from './pages/ReactHookForm/ReactHookForm';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/uncontrolled-form',
    element: <UncontrolledForm />,
  },
  {
    path: '/react-hook-form',
    element: <ReactHookForm />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
