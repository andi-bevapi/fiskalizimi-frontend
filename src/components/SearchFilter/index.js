import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  searchInput: { display: "block" },
  textField: { height: 40,width:"100%" }
}));
const SearchFilter = (props) => {
  const styles = useStyles();
  const handleChange = (e) => {
    props.onFilter(e.target.value.trim().toLowerCase().toString());
  };
  return (
    <div className={styles.searchContainer}>
      <TextField
        className={styles.searchInput}
        placeholder={props.placeholder}
        InputProps={{
          className: styles.textField,
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchFilter;
