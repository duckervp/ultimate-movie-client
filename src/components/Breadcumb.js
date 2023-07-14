import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from './Link';
import { Box } from '@mui/material';
import AdminSidebar from "./AdminSidebar";
import WidgetsIcon from '@mui/icons-material/Widgets';


// const LINKS = [
//   {
//     link: "/",
//     title: "Home"
//   },
//   {
//     link: "/movie",
//     title: "Movie Details"
//   },
// ]

// const CURRENT_PAGE = "Movie";

export default function Breadcrumb(props) {
  const { links, currentPage, admin } = props;
  return (
    <Box sx={{ mb: 2, display: "flex", alignItems: "center"}}>
      {admin ? <AdminSidebar /> : <WidgetsIcon sx={{mr: 0.5, ml: -0.25}}/>}
      <Breadcrumbs aria-label="breadcrumb" >
        {
          links?.map(breadcrumb => <Link
            key={breadcrumb.title}
            variant="h6"
            to={breadcrumb.link}
            children={breadcrumb.title}
            sx={{
              textDecoration: "none",
              color: 'inherit',
              '&:hover': {
                color: "black"
              }
            }}
          />)
        }
        <Typography color="text.primary" variant='h6'>{currentPage}</Typography>
      </Breadcrumbs>
    </Box>
  );
}