import { Box } from "@mui/material";
import Breadcrumb from "../../components/Breadcumb";
import CardNumber from "../../components/CardNumber";

const AdminManagement = () => {

  return (
    <Box>
      <Breadcrumb
        currentPage={"Dashboard"}
        admin
      />
      <Box sx={{ mt: 5, textAlign: "center", display: "flex", justifyContent: "space-between" }}>
        <CardNumber link="/admin/movie" title="Total Movies" data={18}/>
        <CardNumber link="/admin/genre" title="Total Genres" data={20}/>
        <CardNumber link="/admin/producer" title="Total Producers" data={2}/>
      </Box>
    </Box>
  );

}

export default AdminManagement;