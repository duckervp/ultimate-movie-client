import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import Link from "./Link";

const CardNumber = ({ link, title, data}) => {
  return (
    <Link to={link} sx={{ textDecoration: "none" }}>
      <Card sx={{ border: "1px solid lightgray"}}>
        <CardActionArea sx={{p: 2}}>
          <CardContent>
            <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" component="div">
              {data}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default CardNumber;