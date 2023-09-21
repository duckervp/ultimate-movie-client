import PropTypes from 'prop-types';
import { Box, IconButton, Toolbar, Tooltip, Typography, alpha } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import TuneIcon from '@mui/icons-material/Tune';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';


export default function EnhancedTableToolbar(props) {
  const {
    title,
    numSelected,
    toggleCreateDialogOpen,
    toggleEditDialogOpen,
    toggleDeleteDialogOpen,
    scrollPosition,
    viewBtn,
    toggleViewDialogOpen
  } = props;

  return (
    <Box sx={scrollPosition > 110 ? {
      position: "sticky",
      zIndex: 999,
      top: 0
    } : {}}>
      <Toolbar
        sx={scrollPosition > 110 ? {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          bgcolor: (theme) => theme.palette.primary.light
        } :
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
          }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>)
        }

        {(viewBtn && numSelected === 1)
          && <Tooltip title="View">
            <IconButton onClick={toggleViewDialogOpen}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        }

        {numSelected === 1 && (
          <Tooltip title="Edit">
            <IconButton onClick={toggleEditDialogOpen}>
              <TuneIcon />
            </IconButton>
          </Tooltip>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={toggleDeleteDialogOpen}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Create">
            <IconButton onClick={toggleCreateDialogOpen}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </Box>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};