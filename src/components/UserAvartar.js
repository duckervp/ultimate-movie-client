import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import Link from "./Link";
import { useGetUserQuery } from "../features/user/userApiSlice";
import { useEffect } from "react";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/authSlice";

const UserAvatar = () => {
  const dispatch = useDispatch();
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUserQuery();

  useEffect(() => {
    if (isSuccess) {
      const user = data?.result;
      dispatch(setUser({...user}))
    }
  }, [isSuccess, data, dispatch]);

  const content = (
    <Box sx={{ flexGrow: 0 }}>
      <Link to={"/user"} sx={{ textDecoration: "none", color: "black" }} >
        <Tooltip title="Open your profile">
          <IconButton sx={{ p: 0 }}>
            <Avatar src={isSuccess ? data?.result?.avatarUrl : ""} sx={{ width: "30px", height: "30px" }} />
          </IconButton>
        </Tooltip>
      </Link>
    </Box>
  );

  return isLoading ? <Loading/> : content;

}

export default UserAvatar;