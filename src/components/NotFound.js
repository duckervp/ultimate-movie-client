import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = ({ subject }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ background: "aliceblue", height: "40vh", pt: 7, pl: 10 }}>
        <Typography variant="h2">
          {subject} Not Found
        </Typography>
        <Box sx={{ ml: 0.45, mt: 3 }}>
          <Typography variant="body1">
            The resource you requested does not exist.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button onClick={() => navigate("/", { replace: true })} variant="contained" >Home</Button>
            <Button onClick={() => navigate(-1)} sx={{ ml: 2 }} variant="outlined">Go Back</Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ background: "steelblue", height: "60vh" }}>

      </Box>

    </Box>

  );
}

export default NotFound;