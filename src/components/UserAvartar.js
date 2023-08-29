import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import Link from "./Link";

const UserAvatar = ({ user }) => {
  const content = (
    <Box sx={{ flexGrow: 0 }}>
      <Link to={"/user"} sx={{ textDecoration: "none", color: "black" }} >
        <Tooltip title="Open your profile">
          <IconButton sx={{ p: 0 }}>
            <Avatar src={user?.avatarUrl} sx={{ width: "30px", height: "30px" }} />
          </IconButton>
        </Tooltip>
      </Link>
    </Box>
  );

  return content;

}

export default UserAvatar;