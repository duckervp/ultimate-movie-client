import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../features/user/userSlice";
import { isAdmin, isValidToken } from "../jwtHelper";
import NotFound from "./NotFound";

const validateToken = (accessToken, dispatch) => {
  if (!isValidToken(accessToken)) {
    dispatch(logout());
    toast.error("Login is required!", {
      position: toast.POSITION.TOP_RIGHT
    })
    return false;
  }
  return true;
}

const Private = ({ children, admin }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.user.accessToken);

  if (validateToken(accessToken, dispatch)) {
    if (admin) {
      if (isAdmin(accessToken)) {
        return children;
      } else {
        return <NotFound />
      }
    }
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }

}

export default Private;