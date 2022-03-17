import { React } from 'react';

import Dialog from '@mui/material/Dialog';
import { Button, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    width: '32em',
    maxWidth: '100%',
    padding: '1.25em',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    alignText: 'center',
    color: '#595959',
    fontSize: '1.875em',
    fontWeight: '600',
    margin: '0 0 .4em',
  },
  iconContent: {
    margin: '0.55em auto 0.875em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '3em',
    height: '80px',
    width: '80px',
    padding: '10px 10px',
    border: '3px solid',
    borderRadius: '100%',
  },
  description: {
    alignText: 'center',
    color: '#545454',
    fontSize: '1.125em',
    fontWeight: '400',
  },
  btnContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: '1.25em auto 0',
  },
  btn: {
    margin: '.3125em',
    padding: '.625em 2em',
    boxShadow: 'none',
    fontWeight: '500',
    fontSize: '1.0625em',
    textTransform: 'none',
  },
  transition: {
    animation: `$myEffect 300ms`,
  },
  '@keyframes myEffect': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.2)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}));

const ConfirmationDialog = (props) => {
  const classes = useStyles();

  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose} className={classes.transition}>
        <DialogContent className={classes.content}>
          <div className={classes.iconContent} style={{ color: props.iconColor }}>
            {props.icon}
          </div>
          <Typography className={classes.title}>{props.title}</Typography>{' '}
          <Typography className={classes.description}>{props.description}</Typography>{' '}
          <div className={classes.btnContainer}>
            {props.button !== '' && (
              <Button
                className={classes.btn}
                sx={{ background: 'rgb(221, 51, 51)' }}
                variant="contained"
                onClick={props.handleButton}
              >
                {props.button}
              </Button>
            )}
            <Button className={classes.btn} variant="contained" onClick={props.handleClose}>
              Mbyll
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfirmationDialog;
