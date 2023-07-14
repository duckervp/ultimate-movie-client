import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ admin }) => {
  if (admin) {
    return (
      <Box className="layout">
        <Header admin />
        <Box component={Container} className="content"
          sx={{ width: "100%", height: "100%", paddingY: 1, marginY: 2, position: "relative" }}>
          <Box sx={{ marginY: 1 }}></Box>
          <Outlet />

        </Box>
        <Footer />
      </Box>
    );
  } else {
    return (
      <Box className="layout">
        <Header />
        <Outlet />
        <Footer />
      </Box>
    );
  }

}

export default Layout;