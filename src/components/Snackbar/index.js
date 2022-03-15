import { Snackbar, Alert } from '@mui/material';

const SnackbarComponent = (props) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={props.open}
      autoHideDuration={4000}
      onClose={props.handleSnackBarClose}
    >
      <Alert onClose={props.handleSnackBarClose} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
