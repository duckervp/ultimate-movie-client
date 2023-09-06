import * as React from "react"
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Loading from "./Loading";

const DisplaySelection = (props) => {
  const { label, dataRows, setOptionalDialogOpen, selectedRow, setSelectedRow } = props;

  const handleSelectInputChange = (event) => {
    const selectedRow1 = dataRows?.filter(row => row.name === event.target.value).at(0);
    setSelectedRow(selectedRow1);
  };

  if (!selectedRow || dataRows.length === 0) {
    return <Loading  />;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormControl sx={{ minWidth: 200, mr: 1 }}>
            <InputLabel id="Data-select">Select</InputLabel>
            <Select
              labelId="Data-select"
              value={selectedRow.name}
              label={label}
              onChange={handleSelectInputChange}
            >
              {dataRows?.map(row => (<MenuItem key={row?.name.concat("-").concat(row?.id)} value={row?.name}>{row?.name}</MenuItem>))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Button variant="outlined" onClick={() => setOptionalDialogOpen(true)} endIcon={<AddBoxIcon/>} sx={{py: 1.8, px: 3}}>Create</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default DisplaySelection;