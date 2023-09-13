import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import * as React from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import TuneIcon from '@mui/icons-material/Tune';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
/**
const config = {
  headers: [
    {
      field: "Name",
      align: "left"
    },
    {
      field: "Description",
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
    }
  ]
}
*/

const DisplayTable2 = (props) => {
  const { label, dataRows, displayRows, setDisplayRows, setOptionalDialogOpen, selection, config, handleModify } = props;

  const [selectedRow, setSelectedRow] = React.useState('');

  const getSelectionBtnFlexCss1 = () => {
    if (!selection) {
      return {
        display: "flex",
        alignItems: "center",
        my: 1,
        justifyContent: "flex-end"
      };

    }
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      my: 1
    };
  }

  const getSelectionBtnFlexCss2 = () => {
    if (!selection) {
      return {
        display: "flex",
        justifyContent: "flex-end"
      };
    }
    return {};
  }

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
      <Box sx={getSelectionBtnFlexCss1()}>
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
          <Button onClick={handleAddData} variant="outlined" endIcon={<AddCircleOutlineIcon />} sx={{ py: 1.8, px: 3 }}>Add</Button>
        </Box>}
        <Box sx={getSelectionBtnFlexCss2}>
          {selection && <Box component={"span"} sx={{ mr: 1, fontSize: "small", fontWeight: "bold" }}>OR</Box>}
          <Button variant="outlined" onClick={() => setOptionalDialogOpen(true)} endIcon={<AddBoxIcon />} sx={{ py: 1.8, px: 3 }}>Create</Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {config.headers.map(header => <TableCell key={header.field} align={header.align}>{header.field || label}</TableCell>)}
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRows
              // ?.sort((a, b) => {
              //   if (a[config.columns.at(config.keyIndex).field] > b[config.columns.at(config.keyIndex).field]) {
              //     return 1;
              //   } else if (a[config.columns.at(config.keyIndex).field] < b[config.columns.at(config.keyIndex).field]) {
              //     return -1;
              //   } else {
              //     return 0;
              //   }
              // })
              ?.map((row) => (
                <TableRow
                  key={row[config.columns.at(config.keyIndex).field] + "-index-".concat(displayRows?.indexOf(row))}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {
                    config.columns.map(col =>
                      <TableCell
                        align={col.align || 'left'}
                        key={col.field}
                        component="th"
                        scope="row"
                        sx={col.displayImage && { display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        {row[col.field]}
                        {(col.displayImage && row[col.field]) && <img src={row[col.field]} alt={label} height={100} />}
                      </TableCell>
                    )
                  }
                  <TableCell align="right">
                    <Button onClick={() => handleModify(row)}><TuneIcon /></Button>
                    <Button onClick={() => handleDelete(row[config.columns.at(config.keyIndex).field])}><DeleteIcon /></Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DisplayTable2;