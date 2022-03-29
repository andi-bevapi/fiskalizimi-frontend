import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import styles from './Modal.module.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ModalComponent = (props) => {
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
        transitionDuration={400}
        scroll="paper"
        maxWidth={'xl'}
        style={{ zIndex: 2 }}
        classes={{
          scrollPaper: styles.topScrollPaper,
          paperScrollBody: styles.topPaperScrollBody,
        }}
      >
        <DialogTitle className={styles.header}>
          <Typography className={styles.title}>{props.title}</Typography>
          <IconButton onClick={props.handleClose} >
            <CloseIcon className={styles.closeBtn} />
          </IconButton>
        </DialogTitle>
        <DialogContent className={styles.modalContent}>{props.children}</DialogContent>
      </Dialog>
    </>
  );
};

export default ModalComponent;
