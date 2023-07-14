import { Avatar, Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useDispatch, useSelector } from "react-redux";
import { login } from "./userSlice";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import { isValidToken } from "../../jwtHelper";
import SocialLogin from "./SocialLogin";

const LoginForm = () => {
  const accessToken = useSelector(state => state.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = {
      username: data.get("username"),
      password: data.get("password")
    };
    try {
      await dispatch(login(body));
      navigate("/user", { replace: true });
    } catch (error) { }
  }

  const content = (
    <Box sx={{ backgroundColor: "whitesmoke", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <Box sx={{maxWidth: 400}}>
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
          <Avatar sx={{ mb: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} autoComplete="off">
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs sx={{ textAlign: "left" }}>
                <Link component={RouterLink} to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <SocialLogin />
            <Link component={RouterLink} to="/" variant="body2" sx={{ mt: 2, display: "inline-block" }}>
              {"Back to Home"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )

  if (isValidToken(accessToken)) {
    return <Navigate to="/user" replace />;
  } else {
    return content;
  }
}

export default LoginForm;