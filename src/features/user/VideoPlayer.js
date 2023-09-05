import { Box, Typography, Button, Container } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { useParams, useSearchParams } from "react-router-dom";
import * as React from "react";
import { fetchMovieBySlug } from "../../api/movieApi";
import Link from "../../components/Link";
import { sortEpisodeFnc } from "../../utils";
import Loading from "../../components/Loading";
import Breadcrumb from "../../components/Breadcumb";
import NotFound from "../../components/NotFound";
import Player from "./Player";

const VideoPlayer = () => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();

  const [movie, setMovie] = React.useState();

  const [currentEpisode, setCurrentEpisode] = React.useState();

  const [movieEpisodes, setMovieEpisodes] = React.useState();

  React.useEffect(() => {
    const fetchMovie = async () => {
      const data = await fetchMovieBySlug(slug);
      const movieData = data?.result;
      setMovie(movieData);
      setMovieEpisodes(movieData.episodes.sort(sortEpisodeFnc))
      const episode = searchParams.get("episode");
      let currEp = movieData?.episodes?.[0];
      if (episode) {
        currEp = movieData?.episodes?.filter(ep => ep.name === episode)[0];
      }
      setCurrentEpisode(currEp);
    }
    fetchMovie();
  }, [slug, searchParams]);
  
  if (!movie) {
    return <Loading />
  }
  
  if (!currentEpisode) {
    return <NotFound subject={"Episode"}/>
  }

  return (
    <Box component={Container} sx={{ paddingY: 2 }}>
      <Breadcrumb
        links={
          [{ link: "/", title: "Home" }, {link: `/${movie?.slug}`, title: `${movie?.name}`}]
        }
        currentPage="Watch"
      />

      <Player movie={movie} currentEpisode={currentEpisode}/>

      <Box sx={{ marginY: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: 1, fontSize: "25px" }} >
          Episodes
        </Typography>

        <Grid container >
          {
            movieEpisodes?.map(episode =>
              <Grid lg={0.5} key={episode?.id}>
                <Link to={`/${slug}/play?episode=${episode?.name}`} sx={{ textDecoration: "none" }}>
                  <Button size="small" variant={episode?.id === currentEpisode?.id ? "contained" : "outlined"} key={episode}
                    sx={{ minWidth: "45px", paddingY: 1, margin: "2px" }}>
                    {episode?.name}
                  </Button>
                </Link>
              </Grid>
            )
          }
        </Grid>
      </Box>
    </Box>)
}

export default VideoPlayer;