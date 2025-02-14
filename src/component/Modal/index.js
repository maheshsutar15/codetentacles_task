import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Modal({title, isOpen, onClose, Content,SuccessBtnTitle, successFunction}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           {Content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' autoFocus onClick={onClose}>
            Cancel
          </Button>
          <Button variant='contained' onClick={successFunction} autoFocus>
            {SuccessBtnTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
