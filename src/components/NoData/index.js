import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  customStyles: { overflow: "auto" },
  messageStyle: {
    textAlign: "center",
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
