import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoleUser (userRoles, requiredRoles) {
  return requiredRoles.some((role) => userRoles.includes(role));
}

function ProtectedRoles({ allowedRoles, redirectTo = "/" }) {
  // const user = ... стор пользователя где лежит его роль
  const user = null // заглушка
  const userRoles = user?.roles || [];

  const canAccess = ProtectedRoleUser(userRoles, allowedRoles)

  if (!canAccess) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}

export default ProtectedRoles
