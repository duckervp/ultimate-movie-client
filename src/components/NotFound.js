import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NotFound = ({ subject }) => {
  return (
    <Box>
      <Box sx={{ background: "aliceblue", height: "35vh", pt: 7, pl: 10 }}>
        <Typography variant="h2">
          {subject || "Resource"} Not Found
        </Typography>
        <Box sx={{ ml: 0.45, mt: 3}}>
          <Typography variant="body1">
            Your ordered resource could not be discovered or does not exist!
          </Typography>
          <Link component={RouterLink} to="/" variant="body2" sx={{ mt: 2, display: "inline-block" }}>
            {"Back to Home"}
          </Link>
        </Box>
      </Box>
      <Box sx={{ background: "steelblue", height: "65vh" }}>

      </Box>

    </Box>

  );
}

export default NotFound;