import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieForm from "./MovieForm";
import CharacterForm from "./CharacterForm";
import GenreForm from "./GenreForm";
import AlertDialog from "../../components/Dialog";
import { Action } from "../../constants";
import DisplayTable from "../../components/DisplayTable";
import DisplaySelection from "../../components/DisplaySelection";
import DisplayTable2 from "../../components/DisplayTable2";
import EpisodeForm from "./EpisodeForm";
import Breadcrumb from "../../components/Breadcumb";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useFetchMovieQuery } from "../user/slice/movieApiNoCredSlice";
import { handleError, isObjectEquals, showSuccessMessage } from "../../utils";
import { useFetchAllGenresQuery } from "../user/slice/genreApiNoCredSlice";
import { useFetchAllCharactersQuery } from "./slice/characterApiNoCredSlice";
import { useFetchAllProducersQuery } from "./slice/producerApiSlice";
import { useAddMovieMutation, useUpdateMovieMutation } from "./slice/movieApiSlice";
import Loading from "../../components/Loading";

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

const NewMovie = ({ createNew }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const defaultGenre = { name: '', description: '' };
  const defaultCharacter = { id: '', name: '', avatarUrl: '', description: '' };
  const defaultProducer = { name: '', description: '' };
  const defaultEpisode = { id: '', name: '', description: '', url: '' };

  const [movie, setMovie] = React.useState({});

  // form data state
  const [genre, setGenre] = React.useState(defaultGenre);
  const [producer, setProducer] = React.useState(defaultProducer);
  const [orgCharacter, setOrgCharacter] = React.useState(defaultCharacter);
  const [character, setCharacter] = React.useState(defaultCharacter);
  const [orgEpisode, setOrgEpisode] = React.useState(defaultEpisode);   // orgEpisode  -> form data before add/edit
  const [episode, setEpisode] = React.useState(defaultEpisode);         // episode -> form data after add/edit
   
  
  // selectedRows - display rows
  const [selectedGenres, setSelectedGenres] = React.useState([]);
  const [selectedCharacters, setSelectedCharacters] = React.useState([]);
  const [selectedProducer, setSelectedProducer] = React.useState(defaultProducer);
  const [selectedEpisodes, setSelectedEpisodes] = React.useState([]);

  // values for select box
  const [genres, setGenres] = React.useState([]);
  const [characters, setCharacters] = React.useState([]);
  const [producers, setProducers] = React.useState([]);

  const [saveAble, setSaveAble] = React.useState(false);

  // open state for add/edit/delete form
  const [genreDialogOpen, setGenreDialogOpen] = React.useState(false);
  const [characterDialogOpen, setCharacterDialogOpen] = React.useState(false);
  const [producerDialogOpen, setProducerDialogOpen] = React.useState(false);
  const [episodeDialogOpen, setEpisodeDialogOpen] = React.useState(false);
  const [characterEditDialogOpen, setCharacterEditDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  // fetch movie by slug
  const {
    data: movieData,
    isError: isFetchMovieError,
    error: fetchMovieError
  } = useFetchMovieQuery(slug, { skip: createNew });

  React.useEffect(() => {
    setMovie(movieData);
    setSelectedGenres(movieData?.genres.slice() || []);
    setSelectedCharacters(movieData?.characters.slice() || []);
    setSelectedProducer(movieData?.producer);
    setSelectedEpisodes(movieData?.episodes.slice() || []);
  }, [movieData]);

  if (isFetchMovieError) {
    handleError(fetchMovieError, "Cannot fetch the movie!");
  }

  // fetch all genres
  const {
    data: genreData,
    isError: isFetchAllGenresError,
    error: fetchAllGenresError
  } = useFetchAllGenresQuery();

  React.useEffect(() => {
    setGenres(genreData);
  }, [genreData]);

  if (isFetchAllGenresError) {
    handleError(fetchAllGenresError, "Cannot fetch genres!");
  }

  // fetch all characters
  const {
    data: characterData,
    isError: isFetchAllCharactersError,
    error: fetchAllCharactersError
  } = useFetchAllCharactersQuery();


  React.useEffect(() => {
    setCharacters(characterData);
  }, [characterData]);

  if (isFetchAllCharactersError) {
    handleError(fetchAllCharactersError, "Cannot fetch characters!");
  }

  // fetch all producers
  const {
    data: producerData,
    isError: isFetchAllProducersError,
    error: fetchAllProducersError
  } = useFetchAllProducersQuery();

  React.useEffect(() => {
    setProducers(producerData);
  }, [producerData]);

  if (isFetchAllProducersError) {
    handleError(fetchAllProducersError, "Cannot fetch producers!");
  }

  // mutation api
  const [addMovie] = useAddMovieMutation();
  const [updateMovie] = useUpdateMovieMutation();

  // handle methods

  // handle genre actions
  const handleGenreDialogClose = () => {
    setGenreDialogOpen(false);
    setGenre(defaultGenre);
  }

  const handleGenreDialogSave = async () => {
    setSelectedGenres([...selectedGenres].concat(genre));
    setGenre(defaultGenre)
    handleGenreDialogClose();
  }

 
 // handle character actions
  const handleCharacterDialogClose = () => {
    setCharacterDialogOpen(false);
    setCharacter(defaultCharacter);
  }

  const handleCharacterDialogSave = async () => {
    setSelectedCharacters([...selectedCharacters].concat(character));
    setCharacter(defaultCharacter);
    handleCharacterDialogClose();
  }

  const handleEditCharacter = (row) => {
    setCharacterEditDialogOpen(true);
    setOrgCharacter(row);
    setCharacter(row);
  }

  const handleCharacterEditDialogClose = () => {
    setCharacterEditDialogOpen(false);
    setCharacter(orgCharacter);
  }

  const handleCharacterEditDialogSave = () => {
    let index = 0;

    for (let i = 0; i < selectedCharacters.length; i++) {
      if (isObjectEquals(selectedCharacters.at(i), orgCharacter)) {
        index = i;
        break;
      }
    }

    const newChars = selectedCharacters.slice();
    newChars.splice(index, 1, character);

    setSelectedCharacters(newChars);
    handleCharacterEditDialogClose();
  }

  // handle producer actions
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


  // handle episode actions
  const handleEpisodeDialogClose = () => {
    setEpisodeDialogOpen(false);
    setEpisode(defaultEpisode);
  }

  const handleEpisodeDialogSave = async () => {
    setSelectedEpisodes([...selectedEpisodes].concat(episode));
    setEpisode(defaultEpisode)
    handleEpisodeDialogClose();
  }

  const handleEditEpisode = (row) => {
    setEditDialogOpen(true);
    setOrgEpisode(row);
    setEpisode(row);
  }

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEpisode(orgEpisode);
  }

  const handleEditDialogSave = () => {
    let index = 0;

    for (let i = 0; i < selectedEpisodes.length; i++) {
      if (isObjectEquals(selectedEpisodes.at(i), orgEpisode)) {
        index = i;
        break;
      }
    }

    const newSelectedEpisodes = selectedEpisodes.slice();
    newSelectedEpisodes.splice(index, 1, episode);

    setSelectedEpisodes(newSelectedEpisodes);

    handleEditDialogClose();
  }

  // call api create/update movie
  const hanleMovieSaveChange = async () => {
    const moviePayload = {
      ...movie,
      genres: selectedGenres,
      characters: selectedCharacters,
      episodes: selectedEpisodes,
      producer: selectedProducer
    }

    if (createNew) {
      try {
        await addMovie(moviePayload).unwrap();
        showSuccessMessage("Movie created successfully!");
        navigate("/admin/movie", { replace: true });
      } catch (error) {
        handleError(error);
      }
    } else {
      try {
        await updateMovie({ id: movie.id, payload: moviePayload }).unwrap();
        showSuccessMessage("Movie updated successfully!");
      } catch (error) {
        handleError(error);
      }
    }
  }


  if (!genres || !characters || !producers) {
    return <Loading />;
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
        currentPage={createNew ? "Create" : "Edit - " + movie?.name}
        admin
      />

      <MovieForm movie={movie} setMovie={setMovie} createNew={createNew} />

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
              originalState={orgCharacter}
              formState={character}
              setFormState={setCharacter}
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
              originalState={orgEpisode}
              formState={episode}
              setFormState={setEpisode}
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