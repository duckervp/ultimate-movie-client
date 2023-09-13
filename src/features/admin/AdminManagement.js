import { Box } from "@mui/material";
import Breadcrumb from "../../components/Breadcumb";
import CardNumber from "../../components/CardNumber";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const AdminManagement = () => {

  return (
    <Box>
      <Breadcrumb
        currentPage={"Dashboard"}
        admin
      />

      <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="Home" sx={{ mt: 2, textAlign: "center" }}>
        <Grid lg={4} md={6} xs={12}>
          <CardNumber link="/admin/movie" title="Total Movies" data={18} />
        </Grid>
        <Grid lg={4} md={6} xs={12} sx={{}}>
          <CardNumber link="/admin/genre" title="Total Genres" data={20} />
        </Grid>
        <Grid lg={4} md={6} xs={12} sx={{}}>
          <CardNumber link="/admin/producer" title="Total Producers" data={2} />
        </Grid>
        <Grid lg={4} md={6} xs={12} sx={{}}>
          <CardNumber link="/admin/campaign" title="Active Campaigns" data={2} />
        </Grid>
        <Grid lg={4} md={6} xs={12} sx={{}}>
          <CardNumber link="/admin/cron" title="Active Crons" data={2} />
        </Grid>
      </Grid>
    </Box>
  );

}

export default AdminManagement;