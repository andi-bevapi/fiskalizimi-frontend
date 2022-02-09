import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  iconBtn: {
    padding: "7px 9px 2px 9px",
    height: "33px",
    borderRadius: "3px",
  },
  icon: {
      color: "white"
  }
}));

const IconButtonComponent = (props) => {
  const classes = useStyles();
  return (
    <IconButton className={classes.iconBtn} style={props.style} onClick={props.onClick} disabled={props.disabled}>
      <div style={props.iconColor}>{props.icon}</div>
    </IconButton>
  );
};

export default IconButtonComponent;
