import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCredentials, setUser } from "../features/auth/slice/authSlice";
import jwt_decode from "jwt-decode";
import { useRefreshMutation } from "../features/auth/slice/authApiNoCredSlice";

const PersistedLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [refresh] = useRefreshMutation();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const data = await refresh().unwrap();
        dispatch(setCredentials({ accessToken: data?.access_token, role: data?.scope }));
        const { id, name, avt, sub } = jwt_decode(data?.access_token);
        dispatch(setUser({ id, name, email: sub, avatarUrl: avt }));
      } catch (err) {
          console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    !user ? verifyRefreshToken() : setIsLoading(false);
  }, [refresh, dispatch, user]);

  return isLoading ? <Loading fullScreen /> : <Outlet />
}

export default PersistedLogin