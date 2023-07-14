import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Container, IconButton } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GridViewIcon from '@mui/icons-material/GridView';
import StorageIcon from '@mui/icons-material/Storage';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import Link from "../../components/Link";
import { fetchMovieBySlug } from "../../api/movieApi";
import { getListGenre, sortEpisodeFnc } from "../../utils";
import Loading from "../../components/Loading";
import Breadcrumb from "../../components/Breadcumb";

const Movie = () => {
  const { slug } = useParams();

  const [movie, setMovie] = useState({});

  const [translateXValue, setTranslateXValue] = useState(0);
  const [characterViewed, setCharacterViewed] = useState(7);

  const [characterPrev, setCharacterPrev] = useState(false);
  const [characterNext, setCharacterNext] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await fetchMovieBySlug(slug);
      if (data?.code === 200) {
        setMovie(data?.result);
      }
    }
    fetchMovie();
  }, [slug])

  const handleSlideRight = (totalCharacter) => {
    if (characterViewed < totalCharacter) {
      setTranslateXValue(translateXValue - 162.5);
      setCharacterViewed(characterViewed + 1);
    } else {
      setCharacterPrev(true);
      setCharacterNext(false);
    }
  }

  const handleSlideLeft = () => {
    if (translateXValue < 0) {
      setTranslateXValue(translateXValue + 162.5);
      setCharacterViewed(characterViewed - 1);
    } else {
      setCharacterPrev(false);
      setCharacterNext(true);
    }
  }

  if (!movie.episodes) {
    return <Loading />
  }

  return (
    <Box component={Container} sx={{ paddingY: 2 }}>
      <Breadcrumb
        links={
          [{link: "/", title: "Home"}]
        }
        currentPage={movie?.name}
      />
      <Card sx={{ position: "relative" }}>
        <CardActionArea>
          <Link to={`/${slug}/play?episode=${movie.episodes.sort(sortEpisodeFnc)[0]?.name}`}>
            <CardMedia
              component="img"
              height="500"
              image={movie?.bannerUrl}
              alt={movie?.name?.concat(" banner")}
            />
          </Link>
        </CardActionArea>
        <Box sx={{ position: "absolute", top: "10px", left: "10px", display: "flex", alignItems: "center", backgroundColor: "black", padding: "5px 10px", borderRadius: "5px" }}>
          <PlayCircleIcon sx={{ color: "white", marginRight: 1 }} />
          <Typography color={"white"} variant="h6">
            {movie?.name}
          </Typography>
        </Box>

        <Box sx={{ position: "absolute", top: "110px", left: "10px", display: "flex", backgroundColor: "black", padding: "5px 10px", borderRadius: "5px" }}>
          <GridViewIcon sx={{ color: "white", marginRight: 1 }} />
          <Typography color={"white"}>
            Genres: {movie?.genres ? getListGenre(movie.genres) ? getListGenre(movie.genres) : "N/A" : "N/A"}
          </Typography>
        </Box>
        <Box sx={{ position: "absolute", top: "210px", left: "10px", display: "flex", backgroundColor: "black", padding: "5px 10px", borderRadius: "5px" }}>
          <WorkHistoryIcon sx={{ color: "white", marginRight: 1 }} />
          <Typography color={"white"}>
            Release year: {movie?.releaseYear ? movie.releaseYear : "N/A"}
          </Typography>
        </Box>
        <Box sx={{ position: "absolute", top: "310px", left: "10px", display: "flex", backgroundColor: "black", padding: "5px 10px", borderRadius: "5px" }}>
          <StorageIcon sx={{ color: "white", marginRight: 1 }} />
          <Typography color={"white"}>
            Episode: {movie?.totalEpisode ? movie.totalEpisode : "N/A"}
          </Typography>
        </Box>
        <Box sx={{ position: "absolute", top: "410px", left: "10px", display: "flex", backgroundColor: "black", padding: "5px 10px", borderRadius: "5px" }}>
          <IconButton sx={{ padding: 0, margin: 0 }}>
            <FavoriteIcon sx={{ color: "white", marginRight: 1 }} />
          </IconButton>
          <Typography color={"white"}>
            Likes: {"12k"}
          </Typography>
        </Box>
      </Card>

      <Box sx={{ marginTop: "20px" }}>
        <Box>
          <Typography gutterBottom variant="h6" component="div">
            Description
          </Typography>
          <Typography variant="body2">
            {movie?.description}
          </Typography>
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <Typography gutterBottom variant="h6" component="div">
            Characters
          </Typography>
          {
            movie?.characters?.length >= characterViewed ?
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
                {characterPrev && <IconButton sx={{ position: "absolute", left: "10px", zIndex: 1, color: "white", backgroundColor: "black" }} onClick={handleSlideLeft}>
                  <ArrowBackIosNewIcon />
                </IconButton>}

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", overflowX: "hidden" }} >
                  {
                    movie?.characters?.map(character => (
                      <Card key={character.id} sx={{ minWidth: 154.6, width: 154.6, marginX: "5px", position: "relative", transition: "0.3s ease-in-out" }} style={{ transform: `translateX(${translateXValue}px)` }}>
                        <CardActionArea>
                          {/* <Link to={"/"}> */}
                          <CardMedia
                            component="img"
                            height="205"
                            image={character?.avatarUrl}
                            alt={character?.name?.concat(" avatar")}
                          />
                          <Typography sx={{
                            textAlign: "center",
                            fontSize: "16px",
                            padding: "5.5px",
                            position: "absolute",
                            bottom: "0",
                            backgroundColor: "black",
                            color: "white",
                            width: "100%"
                          }}>
                            {character?.name}
                          </Typography>
                          {/* </Link> */}
                        </CardActionArea>
                      </Card>
                    ))
                  }
                  {characterNext && <IconButton sx={{ position: "absolute", right: "10px", zIndex: 1, color: "white", backgroundColor: "black" }} onClick={() => handleSlideRight(movie?.characters?.length)}>
                    <ArrowForwardIosIcon />
                  </IconButton>}
                </Box>
              </Box> :
              <Box sx={{ display: "flex", alignItems: "center" }} >
                {
                  movie?.characters?.map(character => (
                    <Card key={character?.id} sx={{ minWidth: 154.6, width: 154.6, marginX: "5px", position: "relative", transition: "0.3s ease-in-out" }} style={{ transform: `translateX(${translateXValue}px)` }}>
                      <CardActionArea>
                        {/* <Link to={"/"}> */}
                        <CardMedia
                          component="img"
                          height="205"
                          image={character?.avatarUrl}
                          alt={character?.name?.concat(" avatar")}
                        />
                        <Typography sx={{
                          textAlign: "center",
                          fontSize: "16px",
                          padding: "5.5px",
                          position: "absolute",
                          bottom: "0",
                          backgroundColor: "black",
                          color: "white",
                          width: "100%"
                        }}>
                          {character?.name}
                        </Typography>
                        {/* </Link> */}
                      </CardActionArea>
                    </Card>
                  ))
                }
              </Box>
          }
        </Box>
      </Box>
    </Box >
  );
}

export default Movie;