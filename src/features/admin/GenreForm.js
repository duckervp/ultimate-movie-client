import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Action } from '../../constants';

export default function GenreForm(props) {
  const { action, originalState, formState, setFormState, toggleSaveAble } = props;

  const handleChange = (event) => {
    const newState = {...formState};
    newState[event.target.name] = event.target.value;
    setFormState(newState);
  } 

  React.useEffect(() => {
    if (action === Action.EDIT && (originalState.name !== formState.name || originalState.description !== formState.description)) {
      toggleSaveAble(true);
    } else if (action === Action.CREATE && (originalState.name !== formState.name && originalState.description !== formState.description)) {
      toggleSaveAble(true);
    } else {
      toggleSaveAble(false);
    }
  }, [action, originalState, formState, toggleSaveAble]);

  return (
    <React.Fragment>
      <TextField
        required
        id={`genreName-${ Date.now()}`}
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
        id={`genreDescription-${ Date.now()}`}
        name="description"
        label="Description"
        defaultValue={formState.description}
        fullWidth
        multiline
        minRows={4}
        onChange={handleChange}
        autoComplete='off'
      />
    </React.Fragment>
  );
}