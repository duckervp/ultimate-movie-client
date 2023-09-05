import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import SocialLogin from './SocialLogin';
import { useRegisterMutation } from './slice/authApiNoCredSlice';
import { setCredentials, setUser } from './slice/authSlice';
import Loading from '../../components/Loading';
import jwt_decode from "jwt-decode";
import { handleError } from '../../utils';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    };
    try {
      const data = await register(body).unwrap();
      dispatch(setCredentials({ accessToken: data.access_token, role: data.scope }));
      const { id, name, avt, sub } = jwt_decode(data.access_token);
      dispatch(setUser({ id, name, email: sub, avatarUrl: avt }));
      navigate("/", { replace: true });
    } catch (err) {
      handleError(err, "Register Failed");
    }
  };

  if (isLoading) return <Loading fullScreen />

  return (
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} autoComplete='off'>
            <TextField
              autoComplete="off"
              name="name"
              required
              fullWidth
              id="name"
              label="Name"
              margin="normal"
              autoFocus
            />
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              margin="normal"
              autoComplete="off"
            />
            <TextField
              required
              fullWidth
              margin="normal"
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
              Sign Up
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