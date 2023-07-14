import * as React from 'react';
import Box from '@mui/material/Box';
import Copyright from './Copyright';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Copyright />
    </Box>
  );
}

export default Footer;