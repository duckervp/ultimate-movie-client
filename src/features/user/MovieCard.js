import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from "../../components/Link"

const MovieCard = ({ props }) => {

  return (
    <Card sx={{ position: 'relative', height: "100%", width: '100%' }}>
      <Link to={`/${props.slug}`}>
        <CardMedia
          component="img"
          image={props.posterUrl}
          alt={props.name}
          height="100%"
        />
        <Typography bgcolor={"black"} color={"white"}
          sx={{ position: "absolute", top: "5px", left: "5px", padding: "2.5px 7.5px", borderRadius: "2.5px" }}>
          {props.name?.length <= 20 ? props.name : (props.name?.substr(0, 20).concat(".."))}
        </Typography>
        <Typography bgcolor={"black"} color={"white"} sx={{ position: "absolute", bottom: "5px", right: "5px", padding: "2.5px 5px" }}>
          {props.totalEpisode}
        </Typography>
      </Link >
    </Card >
  );
}

export default MovieCard;