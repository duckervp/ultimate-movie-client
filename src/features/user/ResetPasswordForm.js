import { Avatar, Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import NotFound from "../../components/NotFound";
import { useResetPasswordMutation } from "./authApiNoCredSlice";
import { handleError, showSuccessMessage } from "../../utils";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resetPassword] = useResetPasswordMutation();

  if (!searchParams?.get("token")) {
    return <NotFound />
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const payload = {
      token: searchParams?.get("token"),
      newPassword: data.get("password")
    }

    try {
      await resetPassword(payload).unwrap();
      showSuccessMessage("Reset Password Successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      handleError(error);
      navigate("/reset-password-request", { replace: true });
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
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} autoComplete="off">
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
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
                <Link component={RouterLink} to="/" variant="body2" sx={{ display: "inline-block" }}>
                  {"Back to Home"}
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  {"Sign In"}
                </Link>
              </Grid>
            </Grid>
            <SocialLogin />
          </Box>
        </Box>
      </Box>
    </Box>
  )

  return content;
}

export default ResetPasswordForm;