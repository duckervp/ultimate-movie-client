import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMovie, editMovie, fetchMovieBySlug } from "../../api/movieApi";
import MovieForm from "./MovieForm";
import CharacterForm from "./CharacterForm";
import { fetchAllGenres } from "../../api/genreApi";
import { fetchAllCharacters } from "../../api/characterApi";
import GenreForm from "./GenreForm";
import AlertDialog from "../../components/Dialog";
import { Action } from "../../constants";
import DisplayTable from "../../components/DisplayTable";
import { fetchAllProducers } from "../../api/producerApi";
import DisplaySelection from "../../components/DisplaySelection";
import DisplayTable2 from "../../components/DisplayTable2";
import EpisodeForm from "./EpisodeForm";
import { toast } from "react-toastify";
import Breadcrumb from "../../components/Breadcumb";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const EPISODE_TABLE_CONFIG = {
  headers: [
    {
      field: "Name",
      align: "left"
    },
    {
      field: "Description",
      align: "left"
    },
    {
      field: "Url",
      align: "left"
    }
  ],
  keyIndex: 0,
  columns: [
    {
      field: "name",
      align: "left"
    },
    {
      field: "description",
      align: "left"
    },
    {
      field: "url",
      align: "left"
    }
  ]
};
const CHARACTER_TABLE_CONFIG = {
  headers: [
    {
      field: "Name",
      align: "left"
    },
    {
      field: "Description",
      align: "left"
    },
    {
      field: "Avatar Url",
      align: "left"
    }
  ],
  keyIndex: 0,
  columns: [
    {
      field: "name",
      align: "left"
    },
    {
      field: "description",
      align: "left"
    },
    {
      field: "avatarUrl",
      align: "left",
      displayImage: true
    }
  ]
};

const NewMovie = () => {

  const { slug } = useParams();

  const navigate = useNavigate();

  const defaultGenre = { name: '', description: '' };

  const defaultCharacter = { id: '', name: '', avatarUrl: '', description: '' };

  const defaultProducer = { name: '', description: '' };

  const defaultEpisode = { id: '', name: '', description: '', url: '' };

  const [movie, setMovie] = React.useState({});

  const [character, setCharacter] = React.useState(defaultCharacter);

  const [genre, setGenre] = React.useState(defaultGenre);

  const [selectedGenres, setSelectedGenres] = React.useState([]);

  const [selectedCharacters, setSelectedCharacters] = React.useState([]);

  const [producer, setProducer] = React.useState(defaultProducer);

  const [selectedProducer, setSelectedProducer] = React.useState(defaultProducer);

  const [episode, setEpisode] = React.useState(defaultEpisode);

  const [selectedEpisodes, setSelectedEpisodes] = React.useState([]);

  React.useEffect(() => {
    const fetchMovie = async () => {
      const data = await fetchMovieBySlug(slug);
      if (data?.code === 200) {
        const movieData = data?.result;
        setMovie(movieData);
        setSelectedGenres(movieData?.genres);
        setSelectedCharacters(movieData?.characters);
        setSelectedProducer(movieData?.producer);
        setSelectedEpisodes(movieData?.episodes);
      }
    }
    if (slug) {
      fetchMovie();
    }
  }, [slug])

  const [genres, setGenres] = React.useState([]);

  React.useEffect(() => {
    const fetchGenres = async () => {
      const data = await fetchAllGenres();
      setGenres(data?.results);
    }

    fetchGenres();
  }, []);

  const [characters, setCharacters] = React.useState([]);

  React.useEffect(() => {
    const fetchCharacters = async () => {
      const data = await fetchAllCharacters();
      setCharacters(data?.results);
    }

    fetchCharacters();
  }, []);

  const [saveAble, setSaveAble] = React.useState(false);
  const [genreDialogOpen, setGenreDialogOpen] = React.useState(false);
  const [characterDialogOpen, setCharacterDialogOpen] = React.useState(false);
  const [producerDialogOpen, setProducerDialogOpen] = React.useState(false);
  const [episodeDialogOpen, setEpisodeDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [editFormState, setEditFormState] = React.useState(defaultEpisode);
  const [editFormOriginalState, setEditFormOriginalState] = React.useState(defaultEpisode);

  const [characterEditDialogOpen, setCharacterEditDialogOpen] = React.useState(false);
  const [characterEditFormState, setCharacterEditFormState] = React.useState(defaultCharacter);
  const [characterEditFormOriginalState, setCharacterEditFormOriginalState] = React.useState(defaultCharacter);

  const handleGenreDialogClose = () => {
    setGenreDialogOpen(false);
    setGenre(defaultGenre);
  }

  const handleGenreDialogSave = async () => {
    setSelectedGenres([...selectedGenres].concat(genre));
    setGenre(defaultGenre)
    handleGenreDialogClose();
  }

  const handleCharacterDialogClose = () => {
    setCharacterDialogOpen(false);
    setCharacter(defaultCharacter);
  }

  const handleCharacterDialogSave = async () => {
    setSelectedCharacters([...selectedCharacters].concat(character));
    setCharacter(defaultCharacter);
    handleCharacterDialogClose();
  }

  const [producers, setProducers] = React.useState([]);

  React.useEffect(() => {
    const fetchProducers = async () => {
      const data = await fetchAllProducers();
      setProducers(data?.results);
    }

    fetchProducers();
  }, []);

  const handleProducerDialogClose = () => {
    setProducerDialogOpen(false);
    setProducer(defaultProducer);
  }

  const handleProducerDialogSave = async () => {
    setProducers([...producers].concat(producer));
    setMovieProducer();
    setProducer(defaultProducer)
    handleProducerDialogClose();
  }

  const setMovieProducer = () => {
    setMovie({ ...movie, producer: producer });
  }

  const handleEpisodeDialogClose = () => {
    setEpisodeDialogOpen(false);
    setEpisode(defaultEpisode);
  }

  const handleEpisodeDialogSave = async () => {
    setSelectedEpisodes([...selectedEpisodes].concat(episode));
    setEpisode(defaultEpisode)
    handleEpisodeDialogClose();
  }

  const hanleMovieSaveChange = async () => {
    const moviePayload = {
      ...movie,
      genres: selectedGenres,
      characters: selectedCharacters,
      episodes: selectedEpisodes,
      producer: selectedProducer
    }

    if (slug) {
      try {
        await editMovie(movie.id, moviePayload)
        toast.success("Movie updated successfully!", {
          position: toast.POSITION.TOP_RIGHT
        });
      } catch (error) {
        toast.error("Cannot update the movie!", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    } else {
      try {
        await createMovie(moviePayload);
        toast.success("Movie created successfully!", {
          position: toast.POSITION.TOP_RIGHT
        });
        navigate("/admin/movie", { replace: true });
      } catch (error) {
        toast.error("Cannot create the movie!", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }
  }

  const handleEditEpisode = (row) => {
    setEditDialogOpen(true);
    setEditFormOriginalState(row);
    setEditFormState(row);
  }

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditFormState(editFormOriginalState);
  }

  const handleEditDialogSave = () => {
    const episodes = movie.episodes;
    const episode = episodes.filter(ep => ep.id === editFormOriginalState.id).at(0);
    const index = episodes.indexOf(episode);
    episodes.splice(index, 1, editFormState);
    setMovie({ ...movie, episodes })
    handleEditDialogClose();
  }

  const handleEditCharacter = (row) => {
    setCharacterEditDialogOpen(true);
    setCharacterEditFormOriginalState(row);
    setCharacterEditFormState(row);
  }

  const handleCharacterEditDialogClose = () => {
    setCharacterEditDialogOpen(false);
    setCharacterEditFormState(characterEditFormOriginalState);
  }

  const handleCharacterEditDialogSave = () => {
    const characters = movie.characters;
    const character = characters.filter(ep => ep.id === characterEditFormOriginalState.id).at(0);
    const index = characters.indexOf(character);
    characters.splice(index, 1, characterEditFormState);
    setMovie({ ...movie, characters })
    handleCharacterEditDialogClose();
  }

  return (
    <Box>
      <Breadcrumb
        links={
          [
            { link: "/admin", title: "Dashboard" },
            { link: "/admin/movie", title: "Movie" }
          ]
        }
        currentPage={slug ? "Edit - " + movie?.name : "Create"}
        admin
      />

      <MovieForm movie={movie} setMovie={setMovie} createNew={!slug} />

      <Divider sx={{ my: 5 }} />

      <Typography variant="h5">Genre</Typography>
      <Box>
        <AlertDialog
          open={genreDialogOpen}
          dialogTitle="Create new Genre"
          children={
            <GenreForm
              action={Action.CREATE}
              originalState={defaultGenre}
              formState={genre}
              setFormState={setGenre}
              toggleSaveAble={setSaveAble}
            />
          }
          handleProcess={handleGenreDialogSave}
          handleClose={handleGenreDialogClose}
          saveAble={saveAble}
          action={Action.CREATE}
        />
        <DisplayTable
          label="Genre"
          dataRows={genres}
          displayRows={selectedGenres}
          setDisplayRows={setSelectedGenres}
          setOptionalDialogOpen={setGenreDialogOpen}
          selection
        />
      </Box>

      <Divider sx={{ my: 5 }} />

      <Typography variant="h5">Character</Typography>

      <Box>
        <AlertDialog
          open={characterDialogOpen}
          dialogTitle="Create new character"
          children={
            <CharacterForm
              action={Action.CREATE}
              originalState={defaultCharacter}
              formState={character}
              setFormState={setCharacter}
              toggleSaveAble={setSaveAble}
            />
          }
          handleProcess={handleCharacterDialogSave}
          handleClose={handleCharacterDialogClose}
          saveAble={saveAble}
          action={Action.CREATE}
        />
        <AlertDialog
          open={characterEditDialogOpen}
          dialogTitle="Edit a Character"
          children={
            <CharacterForm
              action={Action.EDIT}
              originalState={characterEditFormOriginalState}
              formState={characterEditFormState}
              setFormState={setCharacterEditFormState}
              toggleSaveAble={setSaveAble} />}
          handleProcess={handleCharacterEditDialogSave}
          handleClose={handleCharacterEditDialogClose}
          saveAble={saveAble}
          action={Action.EDIT}
        />
        <DisplayTable2
          label="Character"
          dataRows={characters}
          displayRows={selectedCharacters}
          setDisplayRows={setSelectedCharacters}
          setOptionalDialogOpen={setCharacterDialogOpen}
          config={CHARACTER_TABLE_CONFIG}
          selection
          handleModify={handleEditCharacter}
        />
      </Box>

      <Divider sx={{ my: 5 }} />

      <Typography variant="h5">Producer</Typography>

      <Box>
        <AlertDialog
          open={producerDialogOpen}
          dialogTitle="Create new Producer"
          children={
            <GenreForm
              action={Action.CREATE}
              originalState={defaultProducer}
              formState={producer}
              setFormState={setProducer}
              toggleSaveAble={setSaveAble}
            />
          }
          handleProcess={handleProducerDialogSave}
          handleClose={handleProducerDialogClose}
          saveAble={saveAble}
          action={Action.CREATE}
        />
        <DisplaySelection
          label="Producer"
          dataRows={producers}
          selectedRow={selectedProducer}
          setSelectedRow={setSelectedProducer}
          setOptionalDialogOpen={setProducerDialogOpen}
        />
      </Box>

      <Divider sx={{ my: 5 }} />

      <Typography variant="h5">Episode</Typography>

      <Box>
        <AlertDialog
          open={episodeDialogOpen}
          dialogTitle="Create new Episode"
          children={
            <EpisodeForm
              action={Action.CREATE}
              originalState={defaultEpisode}
              formState={episode}
              setFormState={setEpisode}
              toggleSaveAble={setSaveAble}
            />
          }
          handleProcess={handleEpisodeDialogSave}
          handleClose={handleEpisodeDialogClose}
          saveAble={saveAble}
          action={Action.CREATE}
        />
        <AlertDialog
          open={editDialogOpen}
          dialogTitle="Edit an Episode"
          children={
            <EpisodeForm
              action={Action.EDIT}
              originalState={editFormOriginalState}
              formState={editFormState}
              setFormState={setEditFormState}
              toggleSaveAble={setSaveAble} />}
          handleProcess={handleEditDialogSave}
          handleClose={handleEditDialogClose}
          saveAble={saveAble}
          action={Action.EDIT}
        />
        <DisplayTable2
          label="Episode"
          displayRows={selectedEpisodes}
          setDisplayRows={setSelectedEpisodes}
          setOptionalDialogOpen={setEpisodeDialogOpen}
          config={EPISODE_TABLE_CONFIG}
          handleModify={handleEditEpisode}
        />
      </Box>

      <Button
        onClick={hanleMovieSaveChange}
        variant="contained"
        size="large"
        fullWidth
        startIcon={<CheckCircleIcon />}
        sx={{ mt: 5, py: 2 }}>
        SAVE
      </Button>
    </Box>
  );
}

export default NewMovie;