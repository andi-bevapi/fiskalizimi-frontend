import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "0 0 0 -10px",
  },
  formControlLabel: {
    fontFamily: 'Poppins',
    fontSize: 13
  }
}));

const BootstrapCheckbox = (props) => {
  const classes = useStyles();
  return (
    <FormControlLabel
      className={classes.formControl}
      control={
        <Checkbox
          onChange={props.handleCheck}
          checked={props.checked}
          sx={{
            "&, & + .Mui-checked": {
              "&, & + .MuiFormControlLabel-label": {
                fontSize: "14px",
                fontWeight: "500",
                color: "#797979",
                fontFamily: 'Poppins'
              },
            },
          }}
          size="small"
        />
      }
      label={props.label}
    />
  );
};

export default BootstrapCheckbox;
