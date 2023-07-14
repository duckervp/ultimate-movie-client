import { Navigate, useSearchParams } from "react-router-dom";
import { oauth2Login } from "./userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const OAuth2LoginRedirect = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  if (searchParams.get("token")) {
    const token = searchParams.get("token");
    console.log(token);
    dispatch(oauth2Login(token));
    return <Navigate to={"/"} />
  } else {
    if (searchParams.get("error")) {
      toast.error(searchParams.get("error"), {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    return <Navigate to={"/login"} />
  }
}

export default OAuth2LoginRedirect;