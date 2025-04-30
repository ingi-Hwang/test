import { createBrowserRouter, RouterProvider } from "react-router-dom";
/** Login Page */
import Login from "../Pages/Login";
/** Drawer */
import Drawer from "./Drawer";
/** Dashboard */
import Dashboard from "../Pages/Dashboard/index";
import Sale from "../Pages/Sale/index";
import Calendar from "../Pages/Calendar";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/main",
      element: <Drawer />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "sale",
          element: <Sale />,
        },
        {
          path: "calendar",
          element: <Calendar />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
