import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({dialogSet, closePopUp, dischargeHandler}) {


  const handleClose = () => {
    dischargeHandler()
    closePopUp(false)
  };


  return (
    <div>
      <Dialog
        open={dialogSet}
        onClose={!dialogSet}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you continue this action?"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => closePopUp(false)}>Cancel</Button>
          <Button onClick={ () => handleClose()}>Continue</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

