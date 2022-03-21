import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    overflowX: "scroll",
    marginBottom: "10px",
  },
  button: {
    margin: "3px",
    padding: "5px 10px",
    backgroundColor: "#EBEFF2",
    opacity: "0.7",
    color: "grey",
    maxHeight: "30px",
    lineHeight: "1rem",
    fontSize: "12px",
    textAlign: "center",
    boxShadow: "unset !important",
    minWidth: "max-content",
    "&:hover": {
      backgroundColor: "#EBEFF2",
      opacity: "1",
      color: "black",
    },
  },
  buttonSelected: {
    margin: "3px",
    padding: "5px 10px",
    backgroundColor: "#5fbeaa",
    color: "white",
    maxHeight: "30px",
    lineHeight: "1rem",
    fontSize: "12px",
    textAlign: "center",
    boxShadow: "unset !important",
    minWidth: "max-content",
    animation: `$myEffect 200ms linear`,
    transform: "scale(1.02)",
    "&:hover": {
      backgroundColor: "#5fbeaa",
      opacity: "0.8",
      color: "white",
    },
  },
  "@keyframes myEffect": {
    "0%": {
      transform: "scale(1)",
    },
    "100%": {
      transform: "scale(1.02)",
    },
  },
}));

const ListCategories = (props) => {
  const [selected, setSelected] = useState("All");
  const classes = useStyles();

  useEffect(() => {
    if (props.selected !== "All") {
      const find = props.categories.filter(
        (item) => item.id === props.selected
      );
      setSelected(find[0].name);
    } else setSelected("All");
  }, [props.selected, props.categories]);

  return (
    <div className={classes.container}>
      {selected === "All" ? (
        <Button
          variant="contained"
          className={classes.buttonSelected}
          onClick={() => props.handleChange("All")}
        >
          All
        </Button>
      ) : (
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => props.handleChange("All")}
        >
          All
        </Button>
      )}
      {props.categories?.map((category, index) => {
        if (selected === category.name)
          return (
            <Button
              key={index}
              variant="contained"
              className={classes.buttonSelected}
              onClick={() => props.handleChange(category.id)}
            >
              {category.name}
            </Button>
          );
        else
          return (
            <Button
              variant="contained"
              key={index}
              className={classes.button}
              onClick={() => props.handleChange(category.id)}
            >
              {category.name}
            </Button>
          );
      })}
    </div>
  );
};

export default ListCategories;
