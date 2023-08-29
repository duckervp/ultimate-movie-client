import { Navigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { setCredentials, setUser } from "./authSlice";

const OAuth2LoginRedirect = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  if (searchParams.get("token")) {
    const accessToken = searchParams.get("token");
    const { scope, avt, id, name, sub } = jwt_decode(accessToken);
    dispatch(setCredentials({ accessToken, role: scope ? scope[0] : null }));
    dispatch(setUser({id, name, email: sub, avatarUrl: avt }));
    return <Navigate to={"/"} />
  }
  else {
    if (searchParams.get("error")) {
      toast.error(searchParams.get("error"), {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    return <Navigate to={"/login"} />
  }
}

export default OAuth2LoginRedirect;