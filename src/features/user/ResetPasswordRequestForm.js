import { Avatar, Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useDispatch } from "react-redux";
import { sendResetPasswordRequest } from "./userSlice";
import { Link as RouterLink } from "react-router-dom";
import SocialLogin from "./SocialLogin";

const ResetPasswordRequestForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = {
      email: data.get('email')
    };
    try {
      await dispatch(sendResetPasswordRequest(body));
    } catch (error) { }
  };

  return (
    <Box sx={{ backgroundColor: "whitesmoke", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ maxWidth: 500 }}>
        <Box
          sx={{
            padding: "25px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: "white",
            borderRadius: 2,
            mt: -10
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password Request
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item xs sx={{ textAlign: "left" }}>
                <Link component={RouterLink} to="/" variant="body2">
                  {"Back to Home"}
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Sign in
                </Link>
              </Grid>
            </Grid>
            <SocialLogin />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ResetPasswordRequestForm;