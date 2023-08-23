import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, updateUser } from "./userSlice";
import { Box, Typography, CardMedia, Divider, IconButton, Modal, Tooltip } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CallIcon from '@mui/icons-material/Call';
import MapIcon from '@mui/icons-material/Map';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Container from '@mui/material/Container';
import { FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';
import Link from "../../components/Link";
import { isAdmin } from "../../jwtHelper";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LockResetIcon from '@mui/icons-material/LockReset';
import UserHistory from "./UserHistory";

const titleUp = (string) => {
  if (string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid gray',
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const accessToken = useSelector(state => state.user.accessToken);

  const [profileFormOpen, setProfileFormOpen] = useState(false);

  const handleOpenProfileForm = () => {
    setProfileFormOpen(true);
  };

  const handleCloseProfileForm = () => {
    setProfileFormOpen(false);
  };

  const [passwordFormOpen, setPasswordFormOpen] = useState(false);

  const handleOpenPasswordForm = () => {
    setPasswordFormOpen(true);
  };

  const handleClosePasswordForm = () => {
    setPasswordFormOpen(false);
  };

  const handleProfileFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = {
      id: user?.id,
      name: data.get('name'),
      email: data.get('email'),
      gender: data.get('gender'),
      phoneNumber: data.get('phoneNumber'),
      address: data.get('address')
    };
    try {
      await dispatch(updateUser(body)).unwrap();
      handleCloseProfileForm();
    } catch (error) { }
  }

  const handlePasswordFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = {
      email: user?.email,
      oldPassword: data.get('oldPassword'),
      newPassword: data.get('newPassword')
    };
    try {
      await dispatch(changePassword(body)).unwrap();
      handleClosePasswordForm();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box component={Container} sx={{ mt: 2 }}>
      <Grid container >
        <Grid lg={3.5} md={5} xs={12} sx={{ height: "80vh", padding: 1 }}>
          <Box backgroundColor={"whitesmoke"} width={"100%"} height={"100%"} padding={2}>
            <Box sx={{ display: "flex", marginBottom: 1.5, justifyContent: "space-between" }}>
              <CardMedia
                component="img"
                image={user?.avatarUrl || "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg"} alt="User avatar"
                sx={{ width: 125, height: 125, borderRadius: "10px" }} />
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
                <Typography sx={{ marginLeft: 2, fontWeight: "bold" }}>
                  {titleUp(user?.name)}
                </Typography>

                <Typography sx={{ marginLeft: 2, fontWeight: "bold", background: "white", borderRadius: 5, padding: 1 }}>
                  Level {user?.level || 0}
                </Typography>
              </Box>
            </Box>

            {isAdmin(accessToken) &&
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Administrator
                </Typography>
                <Link to={"/admin"}
                  sx={{
                    display: { md: 'flex' },
                    fontFamily: 'monospace',
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }} >
                  <Tooltip title="Dashboard">
                    <IconButton variant="contained" color="inherit" sx={{ p: 0 }} ><AdminPanelSettingsIcon /></IconButton>
                  </Tooltip>
                </Link>
              </Box>}

            <Divider sx={{ backgroundColor: "black", height: 2 }} />
            <Box sx={{ my: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Information
                </Typography>
                <Box>
                  <Tooltip title="Edit profile">
                    <IconButton onClick={handleOpenProfileForm} sx={{ p: 0, mr: 1 }} color="inherit">
                      <DriveFileRenameOutlineIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Change password">
                    <IconButton onClick={handleOpenPasswordForm} sx={{ p: 0 }} color="inherit">
                      <LockResetIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
                <AssignmentIndIcon style={{ fontSize: 20, marginRight: 5 }} />
                {user.gender}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
                <MapIcon style={{ fontSize: 20, marginRight: 5 }} />
                {user.address ? user.address : "N/A"}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
                <CallIcon style={{ fontSize: 20, marginRight: 5 }} />
                {user.phoneNumber}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
                <EmailIcon style={{ fontSize: 20, marginRight: 5 }} />
                {user.email}
              </Box>
            </Box>

          </Box>
        </Grid>
        <Grid lg={8.5} md={7} xs={12} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ height: { lg: "40vh", md: "40vh" }, padding: 1 }}>
            <Box sx={{ backgroundColor: "whitesmoke", height: "100%", padding: 2 }}>
              <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                Watched Recently
              </Typography>
              <UserHistory />
            </Box>
          </Box>
          <Box sx={{ height: { lg: "40vh", md: "40vh" }, padding: 1 }}>
            <Box backgroundColor={"whitesmoke"} width={"100%"} height={"100%"}>

            </Box>
          </Box>
        </Grid>
      </Grid>

      <Modal
        open={profileFormOpen}
        onClose={handleCloseProfileForm}
        aria-labelledby="parent-modal-title-1"
        aria-describedby="parent-modal-description-1"
      >
        <Container component="main" maxWidth="sm" sx={{ ...style }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" margin="5px 0 10px">
              Edit Profile
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleProfileFormSubmit}>
              <Grid container spacing={2}>
                <Grid container item xs={8} spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      defaultValue={user?.name}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      label="Phone"
                      name="phoneNumber"
                      defaultValue={user?.phoneNumber}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={3} sx={{ marginLeft: "auto" }}>
                  <FormControl>
                    <FormLabel id="radio-gender-form">Gender</FormLabel>
                    <RadioGroup
                      aria-labelledby="radio-gender-form"
                      defaultValue={user?.gender}
                      name="gender"
                    >
                      <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                      <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                      <FormControlLabel value="OTHER" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    defaultValue={user?.email}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="address"
                    label="Address"
                    id="address"
                    defaultValue={user?.address}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>

      <Modal
        open={passwordFormOpen}
        onClose={handleClosePasswordForm}
        aria-labelledby="parent-modal-title-2"
        aria-describedby="parent-modal-description-2"
      >
        <Container component="main" maxWidth="sm" sx={{ ...style }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" margin="5px 0 10px">
              Change Password
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handlePasswordFormSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                label="Old Password"
                name="oldPassword"
                id="old-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                label="New Password"
                name="newPassword"
                id="new-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>
    </Box>
  );
}

export default Profile;