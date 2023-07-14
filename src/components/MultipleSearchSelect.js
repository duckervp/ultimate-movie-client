import * as React from 'react';
import { Autocomplete, TextField } from '@mui/material';


const MultipleSearchSelect = (props) => {

  const { lable, placeHolder, dataList, selectedData, handleSelectedDataChange } = props;

  return (
    <Autocomplete
      multiple
      id="tags-standard"
      options={dataList}
      onChange={(_, data) => handleSelectedDataChange(data)}
      getOptionLabel={(option) => option.name}
      defaultValue={selectedData}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={lable}
          placeholder={placeHolder}
        />
      )}
    />
  );
}

export default MultipleSearchSelect;