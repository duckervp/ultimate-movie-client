import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import Link from "./Link";

const CardNumber = ({ link, title, data, sx }) => {
  return (
    <Card sx={{ width: "30%" }}>
      <CardActionArea sx={sx}>
        <Link to={link} sx={{ p: 2, textDecoration: "none" }}>
          <CardContent>
            <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" component="div">
              {data}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  )
}

export default CardNumber;