import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Pagination, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useSearchParams } from "react-router-dom";
import Link from "../../components/Link";
import Loading from "../../components/Loading";
import Breadcrumb from "../../components/Breadcumb";
import { useFetchAllGenresQuery } from "./slice/genreApiNoCredSlice";
import { useFetchAllMoviesQuery } from "./slice/movieApiNoCredSlice";

const Home = () => {
  const [searchParams] = useSearchParams();
  const pageNo = searchParams.get("page") || 1;
  const pageSize = 15;
  const name = searchParams.get("name");
  const genre = searchParams.get("genre");
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [totalElements, setTotalElements] = useState(0);

  const {
    data: genres,
  } = useFetchAllGenresQuery();

  const {
    data: movieData,
  } = useFetchAllMoviesQuery({ pageNo, pageSize, name, genre });

  useEffect(() => {
    setMovies(movieData?.results);
    setTotalElements(movieData?.totalElements);
  }, [movieData]);

  const handlePageChange = (_, value) => {
    searchParams.set("page", value);
    navigate(`/?${searchParams.toString()}`, { replace: true })
  };

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!movies || !genres) {
    return <Loading />
  }

  return (
    <Box sx={{ paddingY: 2 }} component={Container}>
      <Breadcrumb currentPage="Home" />
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ borderRadius: "5px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ background: "black", color: "white", borderRadius: "5px" }}
        >
          <Typography sx={{ height: "10px", width: '15%', flexShrink: 0, display: "flex", alignItems: "center" }}>
            Genres
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ borderRadius: "5px" }}>
          {
            genres.map(genre =>
              <Link key={genre.slug} to={`/?genre=${genre.slug}`} sx={{ textDecoration: "none" }} >
                <Button variant="outlined" sx={{ margin: 1 }} color={genre.slug === searchParams.get("genre") ? "secondary" : "info"}>
                  {genre.name}
                </Button>
              </Link>
            )
          }
          {searchParams.get("genre") && <Link key={"clear"} to={`/`} sx={{ textDecoration: "none" }} >
            <Button variant="contained" sx={{ margin: 1 }} color="error">
              Clear
            </Button>
          </Link>}
        </AccordionDetails>
      </Accordion>
      <Box></Box>
      <Box sx={{ marginTop: 2 }}>
        <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="Home">
          {
            movies.map(
              movie =>
                <Grid lg={2.4} md={3} sm={4} xs={6} key={movie.id} sx={{ height: 345 }}>
                  <MovieCard props={movie} sx={{ transition: "0.3s ease-in-out" }} />
                </Grid>)
          }
        </Grid>
        {
          (totalElements > pageSize) && <Pagination
            count={Math.ceil(totalElements / pageSize)}
            shape="rounded"
            variant="outlined"
            sx={{ marginTop: 4, display: "flex", justifyContent: "center" }}
            page={Number.parseInt(searchParams.get("page"))}
            onChange={handlePageChange}
          />
        }
      </Box>
    </Box>
  );
}

export default Home;