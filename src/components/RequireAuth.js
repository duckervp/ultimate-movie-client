import { useSelector } from "react-redux";
import { selectCurrentRole, selectCurrentToken } from "../features/user/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRole }) => {
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentRole);
  const location = useLocation();

  return (
    (!allowedRole || role === allowedRole)
      ? <Outlet /> 
        : token 
          ? <Navigate to={"/unauthorized"} state={{ from: location }} replace />
          : <Navigate to={"/login"} state={{ from: location }} replace />
  )
}

export default RequireAuth;