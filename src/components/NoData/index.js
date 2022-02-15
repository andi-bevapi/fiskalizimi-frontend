import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  customStyles: { overflow: "auto" },
  messageStyle: {
    textAlign: "center",
    fontFamily:
      '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: "15px",
    fontWeight: "bold",
    color: "#505458",
  },
}));

const NoData = (props) => {
  const classes = useStyles();

  return <p className={classes.messageStyle}>{props.title}</p>;
};

export default NoData;
