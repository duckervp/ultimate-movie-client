import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Loading from '../../components/Loading';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

const CAMPAIGN_STATUS = [
  { name: "Active", value: "ACTIVE" },
  { name: "Inactive", value: "INACTIVE" }

]

const CAMPAIGN_TYPE = [
  { name: "EMAIL", value: "EMAIL" },
  { name: "SMS", value: "SMS" }
]

export default function CampaignForm(props) {
  const { campaign, setCampaign, createNew } = props;

  const handleTextInputChange = (event) => {
    const newCampaign = { ...campaign };
    newCampaign[event.target.name] = event.target.value;
    setCampaign(newCampaign);
  };

  const handleStatusInputChange = (event) => {
    setCampaign({ ...campaign, status: event.target.value });
  };

  const handleTypeInputChange = (event) => {
    setCampaign({ ...campaign, type: event.target.value });
  };

  if (!createNew && !campaign) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <Box>
        <TextField
          required
          id="campaignName"
          name="name"
          label="Name"
          defaultValue={campaign?.name}
          fullWidth
          sx={{ my: 1 }}
          onChange={handleTextInputChange}
          autoComplete='off'
        />

        <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid lg={3} md={3} sm={12}>
            <Box sx={{ display: "flex", flexDirection: "column"}}>
              <FormControl sx={{ minWidth: 200}}>
                <InputLabel id="status-select">Status</InputLabel>
                <Select
                  labelId="status-select"
                  value={campaign?.status || ''}
                  label="Status"
                  onChange={handleStatusInputChange}
                >
                  {CAMPAIGN_STATUS.map(status => (<MenuItem key={status.value} value={status.value}>{status.name}</MenuItem>))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 200, mt: 1.5 }}>
                <InputLabel id="type-select">Type</InputLabel>
                <Select
                  labelId="type-select"
                  value={campaign?.type || ''}
                  label="Type"
                  onChange={handleTypeInputChange}
                >
                  {CAMPAIGN_TYPE.map(type => (<MenuItem key={type.value} value={type.value}>{type.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid lg={9} md={9} sm={12}>
            <TextField
              required
              id="campaignDescription"
              name="description"
              label="Description"
              defaultValue={campaign?.description}
              fullWidth
              multiline
              minRows={4}
              onChange={handleTextInputChange}
              autoComplete='off'
            />
          </Grid>
        </Grid>

        <TextField
          required
          id="subject"
          name="subject"
          label="Subject"
          defaultValue={campaign?.subject}
          fullWidth
          sx={{ my: 1 }}
          onChange={handleTextInputChange}
          autoComplete='off'
        />
        <TextField
          required
          id="message"
          name="body"
          label="Message"
          defaultValue={campaign?.body}
          fullWidth
          multiline
          minRows={6}
          onChange={handleTextInputChange}
          autoComplete='off'
        />
      </Box>
    </React.Fragment>
  );
}