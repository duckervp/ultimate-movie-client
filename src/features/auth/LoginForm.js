import * as React from "react";
import { Avatar, Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { useLoginMutation } from "./slice/authApiNoCredSlice";
import { setCredentials, setUser } from "./slice/authSlice";
import Loading from "../../components/Loading";
import jwt_decode from "jwt-decode";
import { handleError } from "../../utils";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [login, { isLoading }] = useLoginMutation();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const body = {
      clientId: data.get("email"),
      clientSecret: data.get("password")
    };

    try {
      const data = await login(body).unwrap();
      dispatch(setCredentials({ accessToken: data.access_token, role: data.scope }));
      const { id, name, avt, sub } = jwt_decode(data.access_token);
      dispatch(setUser({ id, name, email: sub, avatarUrl: avt }));
      navigate(from, { replace: true });
    } catch (err) {
      handleError(err, "Login Failed");
    }
  }

  const content = (
    <Box sx={{ backgroundColor: "whitesmoke", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ maxWidth: 400 }}>
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
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              margin="normal"
              autoComplete="email"
            />
            <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
              <InputLabel htmlFor="password">Password *</InputLabel>
              <OutlinedInput
                required
                id="password"
                name="password"
                label="Password"
                fullWidth
                autoComplete='off'
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
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
                <Link component={RouterLink} to="/reset-password-request" variant="body2">
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

  if (isLoading) {
    return <Loading fullScreen />
  }

  return content;
}

export default LoginForm;