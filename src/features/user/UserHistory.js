import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { Box, Card, CardMedia, IconButton, Tooltip, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Link from "../../components/Link";
import { useGetUserHistoryQuery } from "./historyApiSlice";
import { selectCurrentUser } from "./authSlice";
import { toast } from "react-toastify";

const UserHistory = () => {
  const user = useSelector(selectCurrentUser);

  const {
    data: userHistory,
    isLoading,
    isError,
    error
  } = useGetUserHistoryQuery(user.id);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", flexWrap: { xs: "wrap", md: "nowrap" } }} >
      {
        userHistory.map(movie => (
          <Card key={movie.id} sx={{ marginX: "5px", position: "relative", transition: "0.3s ease-in-out", mb: 1 }}>
            <CardMedia
              component="img"
              height="205"
              image={movie?.posterUrl}
              alt={movie?.name?.concat(" poster")}
            />
            <Typography sx={{
              textAlign: "center",
              fontSize: "16px",
              padding: "5.5px",
              position: "absolute",
              top: "0",
              background: "black",
              color: "white",
              width: "100%",
              opacity: 0.5
            }}>
              {movie?.name}
            </Typography>
            <Typography sx={{
              textAlign: "center",
              fontSize: "16px",
              padding: "5.5px",
              position: "absolute",
              top: "0",
              color: "white",
              width: "100%"
            }}>
              {movie?.name}
            </Typography>
            <Box sx={{
              textAlign: "center",
              fontSize: "16px",
              padding: "5.5px",
              position: "absolute",
              bottom: "0",
              color: "white",
            }}>
              {
                movie?.lastWatchedEpisode
                && <Link
                  to={`/${movie?.slug}/play?episode=${movie?.lastWatchedEpisode?.name}`}
                  sx={{ textDecoration: "none", color: "white" }} >
                  <Tooltip title={"Continue watching Ep ".concat(movie?.lastWatchedEpisode?.name)}>
                    <IconButton
                      variant='outlined'
                      color='inherit'
                      sx={{ backgroundColor: "black", p: 0.7, mr: 1, "&:hover": { background: "gray" } }}>
                      <PlayArrowIcon style={{ fontSize: 20 }} />
                    </IconButton>
                  </Tooltip>
                </Link>
              }
              {
                movie?.nextEpisode
                && <Link
                  to={`/${movie?.slug}/play?episode=${movie?.nextEpisode?.name}`}
                  sx={{ textDecoration: "none", color: "white" }} >
                  <Tooltip title={"Next Ep ".concat(movie?.nextEpisode?.name)}>
                    <IconButton
                      variant='outlined'
                      color='inherit'
                      sx={{ backgroundColor: "black", p: 0.7, "&:hover": { background: "gray" } }}>
                      <SkipNextIcon style={{ fontSize: 20 }} />
                    </IconButton>
                  </Tooltip>
                </Link>
              }
            </Box>
          </Card>
        ))
      }
    </Box >
  );

}

export default UserHistory;