import { Avatar, Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials, setUser } from "./authSlice";
import Loading from "../../components/Loading";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    // const body = {
    //   clientId: data.get("email"),
    //   clientSecret: data.get("password")
    // };

    const body = {
      clientId: "duc@mail.com",
      clientSecret: "tran12345"
    };

    try {
      const data = await login(body).unwrap();
      dispatch(setCredentials({ accessToken: data.access_token, role: data.scope }));
      const { id, name, avt, sub } = jwt_decode(data.access_token);
      dispatch(setUser({ id, name, email: sub, avatarUrl: avt }));
      navigate(from, { replace: true });
    } catch (err) {
      const code = err.data?.code;
      let message = "";
      if (!code) {
        message = "No Server Response";
      } else if (code === 401) {
        message = "Unauthorized";
      } else {
        message = "Login Failed";
      }
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
      });
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