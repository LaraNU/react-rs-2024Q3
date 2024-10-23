import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import UncontrolledForm from './pages/UncontrolledForm/UncontrolledForm';
import ReactHookForm from './pages/ReactHookForm/ReactHookForm';
import { Provider } from 'react-redux';
import store from './store/store';
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
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
