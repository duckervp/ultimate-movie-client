import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import FileUploader from '../../components/FileUploader';
import Loading from '../../components/Loading';

const COUNTRY = [
  { name: "Vietnam", value: "VN" },
  { name: "China", value: "CN" },
  { name: "Japan", value: "JP" },
  { name: "Korea", value: "KR" }
]

export default function MovieForm(props) {
  const { movie, setMovie, createNew } = props;

  const handleTextInputChange = (event) => {
    const newMovie = { ...movie };
    newMovie[event.target.name] = event.target.value;
    setMovie(newMovie);
  };

  const handleReleaseYearInputChange = (newValue) => {
    console.log(newValue);
    setMovie({ ...movie, releaseYear: newValue.$y });
  };

  const handleCountryInputChange = (event) => {
    setMovie({ ...movie, country: event.target.value });
  };

  const setBannerUrl = (url) => {
    setMovie({ ...movie, bannerUrl: url });
  }

  const setPosterUrl = (url) => {
    setMovie({ ...movie, posterUrl: url });
  }

  if (!createNew && !movie?.name) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <Box>
        <TextField
          required
          id="movieName"
          name="name"
          label="Name"
          defaultValue={movie?.name}
          fullWidth
          sx={{ my: 1 }}
          onChange={handleTextInputChange}
          autoComplete='off'
        />

        <FileUploader
          label="Poster"
          htmlId="moviePoster"
          name="posterUrl"
          displayImage
          url={movie?.posterUrl}
          setUrl={setPosterUrl}
        />

        <FileUploader
          label="Banner"
          displayImage
          url={movie?.bannerUrl}
          setUrl={setBannerUrl}
        />

        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2, marginTop: 3 }}>
          <FormControl sx={{ minWidth: 200, mr: 1 }}>
            <InputLabel id="country-select">Country</InputLabel>
            <Select
              labelId="country-select"
              value={movie?.country || ''}
              label="Country"
              onChange={handleCountryInputChange}
            >
              {COUNTRY.map(country => (<MenuItem key={country.value} value={country.value}>{country.name}</MenuItem>))}
            </Select>
          </FormControl>
          <TextField
            type="number"
            required
            id="totalEpisode"
            name="totalEpisode"
            label="Total Episode"
            defaultValue={movie?.totalEpisode}
            fullWidth
            sx={{ mr: 1 }}
            onChange={handleTextInputChange}
            autoComplete='off'
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={['year']}
              label="Release Year"
              openTo="year"
              value={movie?.releaseYear ? dayjs(`${movie?.releaseYear}-01-01`) : dayjs(new Date())}
              onChange={(newValue) => handleReleaseYearInputChange(newValue)}
              sx={{ minWidth: 200 }}
            />
          </LocalizationProvider>
        </Box>


        <TextField
          required
          id="movieDescription"
          name="description"
          label="Description"
          defaultValue={movie?.description}
          fullWidth
          multiline
          minRows={4}
          onChange={handleTextInputChange}
          autoComplete='off'
        />
      </Box>
    </React.Fragment>
  );
}