import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, saveUser } from "./userSlice";
import { Box, Typography, CardMedia, Divider, IconButton, Modal } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CallIcon from '@mui/icons-material/Call';
import MapIcon from '@mui/icons-material/Map';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Container from '@mui/material/Container';
import { FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';
import Link from "../../components/Link";
import { isAdmin } from "../../jwtHelper";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

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

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
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
      await dispatch(saveUser(body));
      handleClose();
    } catch (error) { }
  }

  return (
    <Box component={Container} sx={{mt: 2}}>
      <Grid container >
        <Grid lg={3} sx={{ height: "80vh", padding: 1 }}>
          <Box backgroundColor={"whitesmoke"} width={"100%"} height={"100%"} padding={2}>
            <Box sx={{ display: "flex", marginBottom: 1.5 }}>
              <CardMedia component="img" image={user?.avatarUrl || "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg"} alt="User avatar" sx={{ width: 125, height: 125, borderRadius: "10px" }} />
              <Typography sx={{ marginLeft: 2, fontWeight: "bold" }}>
                {titleUp(user.name)}
              </Typography>
            </Box>
            <Divider sx={{ backgroundColor: "black", height: 2 }} />
            <Box marginTop={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Information
                </Typography>
                <IconButton onClick={handleOpen} sx={{ p: 0 }} color="secondary">
                  <DriveFileRenameOutlineIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
                <EmailIcon sx={{ marginRight: "5px" }} />
                {user.email}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
                <CallIcon sx={{ marginRight: "5px" }} />
                {user.phoneNumber}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
                <AssignmentIndIcon sx={{ marginRight: "5px" }} />
                {user.gender}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
                <MapIcon sx={{ marginRight: "5px" }} />
                {user.address ? user.address : "N/A"}
              </Box>
            </Box>

            {isAdmin(accessToken) && <Box>
              <Divider sx={{ backgroundColor: "black", height: 2, my: 2 }} />
              <Typography sx={{ fontWeight: "bold", mb: 2 }}>
                Administrator
              </Typography>
              <Link to={"/admin"}
                children={<Button variant="contained" color="inherit" startIcon={<AdminPanelSettingsIcon />}>
                  Dashboard
                </Button>}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }} />
            </Box>}
          </Box>
        </Grid>
        <Grid lg={9} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ height: "40vh", padding: 1 }}>
            <Box backgroundColor={"whitesmoke"} width={"100%"} height={"100%"}>

            </Box>
          </Box>
          <Box sx={{ height: "40vh", padding: 1 }}>
            <Box backgroundColor={"whitesmoke"} width={"100%"} height={"100%"}>

            </Box>
          </Box>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Container component="main" maxWidth="sm" sx={{ ...style }}>
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" margin="5px 0 10px">
              Edit profile
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
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
    </Box>
  );
}

export default Profile;