import { Link, Typography, Container, Box } from "@mui/material";

export default function Copyright(props) {
  return (
    <Box>
      <Container>
        <Typography variant="body2" color="text.secondary" align="left" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="">
            Ghost
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
}