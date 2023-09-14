import { Box, Typography } from "@mui/material";

const DeleteForm = (props) => {
  const { names } = props;

  return (
    <Box>
      <Typography component={"span"} sx={{fontWeight: "bold"}}>Are you sure to delete</Typography>
      {names.map(name => (<Typography key={Math.random()} component={"span"} color="red" sx={{ marginLeft: "5px" }}>[ {name} ]</Typography>))} ?
    </Box>
  );
}

export default DeleteForm;