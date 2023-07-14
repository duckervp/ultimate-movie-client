import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { Action } from '../constants';

export default function AlertDialog(props) {
  const { open, dialogTitle, children, handleProcess, handleClose, saveAble, action } = props;
  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" component={Box}>
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {saveAble && ([Action.CREATE, Action.EDIT].includes(action)) && <Button onClick={handleProcess}>Save</Button>}
          {action === Action.DELETE && <Button onClick={handleProcess}>Delete</Button>}
          <Button onClick={handleClose} autoFocus>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}