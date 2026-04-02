import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";

import Error404Page from "../pages/page404/Page404";

// Реализация ленивой загрузки
const Home = React.lazy(() => import("../pages/home/Home"));
const Login = React.lazy(() => import("../pages/auth/Login"));
const Register = React.lazy(() => import("../pages/auth/Register"));

const routers = createBrowserRouter([
  {
    path: "*",
    element: <Error404Page />
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
    ]
  }
]);

export default routers
