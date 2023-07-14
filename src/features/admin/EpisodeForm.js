import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Action } from '../../constants';
import FileUploader from "../../components/FileUploader";
import { Box } from '@mui/material';

export default function EpisodeForm(props) {
  const { action, originalState, formState, setFormState, toggleSaveAble } = props;


  const handleChange = (event) => {
    const newState = {...formState};
    newState[event.target.name] = event.target.value;
    setFormState(newState);
  } 

  const setFormStateUrl = (url) => {
    setFormState({...formState, url: url});
  }

  React.useEffect(() => {
    const formStateKeys = Object.keys(formState);
    let saveAble = false;
    if (action === Action.EDIT) {
      for (let i = 0; i < formStateKeys.length; i++) {
        if (formState[formStateKeys.at(i)] !== originalState[formStateKeys.at(i)]) {
          saveAble = true;
        }
      }
    } else if (action === Action.CREATE) {
      saveAble = true;
      for (let i = 0; i < formStateKeys.length; i++) {
        if (formStateKeys.at(i) !== "id" && formState[formStateKeys.at(i)] === originalState[formStateKeys.at(i)]) {
          saveAble = false;
        }
      }
    }
    toggleSaveAble(saveAble);
  }, [action, originalState, formState, toggleSaveAble]);

  return (
    <Box>
      <TextField
        required
        id={`episodeName-${ Date.now()}`}
        name="name"
        label="Name"
        defaultValue={formState.name}
        fullWidth
        sx={{ marginBottom: 2, marginTop: 1 }}
        onChange={handleChange}
        autoComplete='off'
      />
      <TextField
        required
        id={`episodeDescription-${ Date.now()}`}
        name="description"
        label="Description"
        defaultValue={formState.description}
        fullWidth
        multiline
        minRows={4}
        sx={{ marginBottom: 2, marginTop: 1 }}
        onChange={handleChange}
        autoComplete='off'
      />
      
      <FileUploader  name="video" url={formState.url} setUrl={setFormStateUrl} loader='progress' label="Video" />
    </Box>
  );
}