import { lazy } from "react";

export const HomePage = lazy(() => import("../pages/home/Home"));
export const LoginPage = lazy(() => import("../pages/auth/Login"));
export const RegisterPage = lazy(() => import("../pages/auth/Register"));
export const NotFoundPage = lazy(() => import("../pages/page404/Page404"));
