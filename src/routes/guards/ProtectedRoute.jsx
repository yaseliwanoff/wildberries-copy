import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectUserRoles, useAuthStore } from "../../stores/authStore";
import { ROUTES } from "../paths";

function hasRequiredRole(userRoles, allowedRoles) {
  return allowedRoles.some((role) => userRoles.includes(role));
}

function ProtectedRoute({ allowedRoles, redirectTo = ROUTES.HOME }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRoles = useAuthStore(selectUserRoles);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles?.length && !hasRequiredRole(userRoles, allowedRoles)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
