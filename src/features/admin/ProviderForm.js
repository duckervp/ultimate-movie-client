import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Action } from '../../constants';

const formState_STATUSES = [
  { name: "Active", value: "ACTIVE" },
  { name: "Inactive", value: "INACTIVE" }

]

const formState_TYPES = [
  { name: "EMAIL", value: "EMAIL" },
  { name: "SMS", value: "SMS" }
]

const SEND_METHODS = [
  { name: "SMTP", value: "SMTP" },
  { name: "API", value: "API" }
]

export default function ProviderForm(props) {

  const { action, originalState, formState, setFormState, toggleSaveAble } = props;

  const handleInputChange = (event) => {
    const newState = {...formState};
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

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <FormControl sx={{ minWidth: 130, width: '100%', mr: 1}}>
            <InputLabel id="status-select">Status</InputLabel>
            <Select
              labelId="status-select"
              value={formState?.status || ''}
              label="Status"
              name='status'
              onChange={handleInputChange}
            >
              {formState_STATUSES.map(item => (<MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 130, width: '100%', mr: 1 }}>
            <InputLabel id="type-select">Type</InputLabel>
            <Select
              labelId="type-select"
              value={formState?.type || ''}
              label="Type"
              name='type'
              onChange={handleInputChange}
            >
              {formState_TYPES.map(item => (<MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 130, width: '100%' }}>
            <InputLabel id="type-select">Method</InputLabel>
            <Select
              labelId="type-select"
              value={formState?.sendMethod || ''}
              label="Method"
              name="sendMethod"
              onChange={handleInputChange}
            >
              {SEND_METHODS.map(item => (<MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>))}
            </Select>
          </FormControl>
        </Box>

        {
          formState?.sendMethod === SEND_METHODS.at(0)["name"] &&
          <>
            <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid sm={9}>
                <TextField
                  required
                  id="hostname"
                  name="hostname"
                  label="Hostname"
                  defaultValue={formState?.hostname}
                  fullWidth
                  sx={{ my: 1 }}
                  onChange={handleInputChange}
                  autoComplete='off'
                />
              </Grid>
              <Grid sm={3}>
                <TextField
                  required
                  id="port"
                  name="port"
                  label="Port"
                  defaultValue={formState?.port}
                  fullWidth
                  sx={{ my: 1 }}
                  onChange={handleInputChange}
                  autoComplete='off'
                />

              </Grid>
            </Grid>

            <TextField
              required
              id="username"
              name="username"
              label="Username"
              defaultValue={formState?.username}
              fullWidth
              sx={{ my: 1 }}
              onChange={handleInputChange}
              autoComplete='off'
            />

            <FormControl fullWidth variant="outlined" sx={{ my: 1 }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                required
                id="password"
                name="password"
                label="Password"
                defaultValue={formState?.password}
                fullWidth
                onChange={handleInputChange}
                autoComplete='off'
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </>
        }
        {
          formState?.sendMethod === SEND_METHODS.at(1)["name"] &&
          <>
            <TextField
              required
              id="domainName"
              name="apiDomainName"
              label="API Domain Name"
              defaultValue={formState?.apiDomainName}
              fullWidth
              sx={{ my: 1 }}
              onChange={handleInputChange}
              autoComplete='off'
            />

            <FormControl fullWidth variant="outlined" sx={{ my: 1 }}>
              <InputLabel htmlFor="apiKey">API Key *</InputLabel>
              <OutlinedInput
                required
                id="apiKey"
                name="apiKey"
                label="API Key"
                defaultValue={formState?.apiKey}
                fullWidth
                onChange={handleInputChange}
                autoComplete='off'
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <TextField
              required
              id="sender"
              name="sender"
              label="Sender"
              defaultValue={formState?.sender}
              fullWidth
              sx={{ my: 1 }}
              onChange={handleInputChange}
              autoComplete='off'
            />
          </>
        }
      </Box>
    </React.Fragment>
  );
}