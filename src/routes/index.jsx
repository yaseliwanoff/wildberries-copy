import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import RouteErrorPage from "../components/routing/RouteErrorPage";
import GuestRoute from "./guards/GuestRoute";
import { HomePage, LoginPage, NotFoundPage, RegisterPage } from "./lazyPages";
import { ROUTES, ROUTE_HANDLE } from "./paths";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        handle: ROUTE_HANDLE.HOME,
      },
      {
        path: "*",
        element: <NotFoundPage />,
        handle: ROUTE_HANDLE.NOT_FOUND,
      },
    ],
  },
  {
    path: ROUTES.AUTH.ROOT,
    element: <AuthLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        element: <GuestRoute />,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.AUTH.LOGIN} replace />,
          },
          {
            path: "login",
            element: <LoginPage />,
            handle: ROUTE_HANDLE.LOGIN,
          },
          {
            path: "register",
            element: <RegisterPage />,
            handle: ROUTE_HANDLE.REGISTER,
          },
        ],
      },
    ],
  },
]);

export default router;
