import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputBase from '@mui/material/InputBase';

import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  label: {
    fontFamily: "'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize: '18px',
    fontWeight: '700',
    color: '#797979',
    margin: '5px 0 0 0',
  },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    // position: "relative",
    backgroundColor: 'white',
    border: '1px solid #ced4da',
    fontSize: 14,
    width: '230px',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    fontFamily: "'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    '&:focus': {
      boxShadow: 'none',
      borderColor: '#ced4da',
    },
  },
}));

const BootstrapInputField = (props) => {
  const classes = useStyles();

  return (
    <FormControl variant="standard" style={props.styles}>
      <InputLabel shrink className={classes.label} focused={false} htmlFor="bootstrap-input">
        {props.label}
      </InputLabel>
      <BootstrapInput id={props.id} placeholder={props.placeholder} {...props} />
    </FormControl>
  );
};

export default BootstrapInputField;
