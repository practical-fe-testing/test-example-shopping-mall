import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

const ConfirmModal = props => {
  const {
    title,
    description,
    handleClickDisagree,
    handleClickAgree,
    isModalOpened,
  } = props;

  return (
    <Dialog
      open={isModalOpened}
      maxWidth="sx"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      transitionDuration={{ enter: 0, exit: 0 }}
    >
      <DialogTitle id="modal-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="modal-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickDisagree}>취소</Button>
        <Button onClick={handleClickAgree} autoFocus>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
