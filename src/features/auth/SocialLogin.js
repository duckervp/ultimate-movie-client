import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, IconButton, Typography } from '@mui/material';
import { FacebookRounded } from '@mui/icons-material';
import Link from '../../components/Link';
import { BASE_URL } from '../../constants';
const SocialLogin = () => {
  return (
    <Box sx={{ textAlign: "center", my: 2 }}>
      <Typography variant='caption' >or you can sign in with</Typography>
      <Box>
        <Link to={`${BASE_URL}oauth2/authorization/google`}>
          <IconButton>
            <GoogleIcon />
          </IconButton>
        </Link>
        <Link to={`${BASE_URL}oauth2/authorization/github`}>
          <IconButton>
            <GitHubIcon />
          </IconButton>
        </Link>
        <Link to={`${BASE_URL}oauth2/authorization/facebook`}>
          <IconButton>
            <FacebookRounded />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
}

export default SocialLogin;