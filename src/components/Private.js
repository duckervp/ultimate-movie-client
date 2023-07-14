import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../features/user/userSlice";
import { isAdmin, isValidToken } from "../jwtHelper";
import NotFound from "./NotFound";

const validateToken = (accessToken, dispatch) => {
  let msg;
  if (!accessToken) {
    msg = "Login is required!";
  } else if (!isValidToken(accessToken)) {
    msg = "Token is expired!";
  }
  if (msg) {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT
    })
    dispatch(logout());
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