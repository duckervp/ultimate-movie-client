import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import * as React from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';

const DisplayTable = (props) => {
  const { label, dataRows, displayRows, setDisplayRows, setOptionalDialogOpen, selection } = props;

  const [selectedRow, setSelectedRow] = React.useState('');

  const handleSelectInputChange = (event) => {
    setSelectedRow(event.target.value);
  };

  const handleAddData = () => {
    setDisplayRows([...displayRows].concat(dataRows.filter(row => row?.name === selectedRow && !displayRows.includes(row))))
  }

  const handleDelete = (name) => {
    setDisplayRows([...displayRows].filter(row => row?.name !== name))
  }

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 1}} >
        {selection && <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormControl sx={{ minWidth: 200, mr: 1 }}>
            <InputLabel id="Data-select">Select</InputLabel>
            <Select
              labelId="Data-select"
              value={selectedRow}
              label={label}
              onChange={handleSelectInputChange}
            >
              {dataRows?.map(row => (<MenuItem key={row?.name + '-' + row?.id} value={row?.name}>{row?.name}</MenuItem>))}
            </Select>
          </FormControl>
          <Button onClick={handleAddData} variant="outlined" endIcon={<AddCircleOutlineIcon />} sx={{py: 1.8, px: 3}}>Add</Button>
        </Box>}
        <Box>
          {selection && <Box component={"span"} sx={{ mr: 1, fontSize: "small", fontWeight: "bold"  }}>OR</Box>}
          <Button variant="outlined" onClick={() => setOptionalDialogOpen(true)} endIcon={<AddBoxIcon/>} sx={{py: 1.8, px: 3}}>Create</Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">{label}</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRows?.map((row) => (
              <TableRow
                key={row?.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.name}
                </TableCell>
                <TableCell align="right"><Button onClick={() => handleDelete(row?.name)}><DeleteIcon /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DisplayTable;