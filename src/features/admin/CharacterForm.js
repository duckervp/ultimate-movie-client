import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Action } from '../../constants';
import { Box } from '@mui/material';
import FileUploader from '../../components/FileUploader';

export default function CharacterForm(props) {
  const { action, originalState, formState, setFormState, toggleSaveAble } = props;

  const handleChange = (event) => {
    const newState = { ...formState };
    newState[event.target.name] = event.target.value;
    setFormState(newState);
  }

  const setUrl = (url) => {
    setFormState({...formState, avatarUrl: url});
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
    <Box minWidth={400}>
      <TextField
        required
        id="name"
        name="name"
        label="Name"
        defaultValue={formState.name}
        fullWidth
        sx={{ marginBottom: 2, marginTop: 1 }}
        onChange={handleChange}
        autoComplete='off'
      />

      <FileUploader name="avatar" url={formState.avatarUrl}  setUrl={setUrl} label="Avatar" loader="linear"/>

      <TextField
        required
        id="description"
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
    </Box>
  );
}