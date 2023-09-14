import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Action } from '../../constants';

const SCHEDULE_STATUSES = [
  { name: "Active", value: "ACTIVE" },
  { name: "Inactive", value: "INACTIVE" }

]

const HTTP_METHODS = [
  { name: "GET", value: "GET" },
  { name: "POST", value: "POST" },
  { name: "PATCH", value: "PATCH" },
  { name: "PUT", value: "PUT" },
  { name: "DELETE", value: "DELETE" },
]

export default function ScheduleForm(props) {

  const { action, originalState, formState, setFormState, toggleSaveAble } = props;

  const handleInputChange = (event) => {
    const newState = { ...formState };
    newState[event.target.name] = event.target.value;
    setFormState(newState);
  }

  React.useEffect(() => {
    let saveAble = true;

    // Object.keys(originalState).forEach(key => {
    //   if (originalState[key] !== formState[key]) {
    //     saveAble = true;
    //   }
    // });

    // Object.keys(formState).forEach(key => {
    //   if (formState[key] === "") {
    //     saveAble = false;
    //   }
    // });
    console.log(saveAble);
    toggleSaveAble(saveAble);
  }, [action, originalState, formState, toggleSaveAble]);

  return (
    <React.Fragment>
      <Box>
        <TextField
          required
          id="formStateName"
          name="name"
          label="Name"
          defaultValue={formState?.name}
          fullWidth
          sx={{ my: 1 }}
          onChange={handleInputChange}
          autoComplete='off'
        />

        <TextField
          required
          id="cronExpression"
          name="cronExpression"
          label="Cron Expression"
          defaultValue={formState?.cronExpression}
          fullWidth
          sx={{ my: 1 }}
          onChange={handleInputChange}
          autoComplete='off'
        />

        <TextField
          required
          id="url"
          name="url"
          label="URL"
          defaultValue={formState?.url}
          fullWidth
          sx={{ my: 1 }}
          onChange={handleInputChange}
          autoComplete='off'
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <FormControl sx={{ minWidth: 130, width: '100%', mr: 1 }}>
            <InputLabel id="type-select">Method</InputLabel>
            <Select
              labelId="type-select"
              value={formState?.method || ''}
              label="Method"
              name='method'
              onChange={handleInputChange}
            >
              {HTTP_METHODS.map(item => (<MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 130, width: '100%', mr: 1 }}>
            <InputLabel id="status-select">Status</InputLabel>
            <Select
              labelId="status-select"
              value={formState?.status || ''}
              label="Status"
              name='status'
              onChange={handleInputChange}
            >
              {SCHEDULE_STATUSES.map(item => (<MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </React.Fragment>
  );
}