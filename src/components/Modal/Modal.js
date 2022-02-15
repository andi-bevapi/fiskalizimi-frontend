import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import { DialogTitle, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  topScrollPaper: {
    alignItems: 'flex-start',
  },
  topPaperScrollBody: {
    verticalAlign: 'top',
  },
  title: {
    color: '#505458',
    fontSize: '16px',
    fontFamily: '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: '500',
  },
  header: {
    height: '60px',
    display: 'flex',
    alignItems: 'center',
  },
  closeBtn: {
    height: '20px',
    width: '20px',
  },
  iconBtn: {
    marginRight: '0%',
    marginLeft: 'auto',
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ModalComponent = (props) => {
  const classes = useStyles();

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
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <DialogTitle className={classes.header}>
          <Typography className={classes.title}>{props.title}</Typography>
          <IconButton onClick={props.handleClose} className={classes.iconBtn}>
            <CloseIcon className={classes.closeBtn} />
          </IconButton>
        </DialogTitle>
        <DialogContent>{props.children}</DialogContent>
      </Dialog>
    </>
  );
};

export default ModalComponent;
