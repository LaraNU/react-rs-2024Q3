import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchPage from "./pages/SearchPage/SearchPage";
import NoPage from "./pages/NoPage/NoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
  },
  {
    path: "/*",
    element: <NoPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
