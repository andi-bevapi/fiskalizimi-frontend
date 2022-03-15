import { makeStyles } from '@mui/styles';
import BootstrapInputField from '../InputFields/BootstrapTextField';

const useStyles = makeStyles(() => ({
  searchInput: { display: 'block' },
  textField: { height: 40, width: '100%' },
}));
const SearchFilter = (props) => {
  const styles = useStyles();
  const handleChange = (e) => {
    props.onFilter(e.target.value.trim().toLowerCase().toString());
  };
  return (
    <div className={styles.searchContainer}>
      <BootstrapInputField
        placeholder={props.placeholder}
        id="branch"
        onChange={handleChange}
        style={{ margin: 0 }}
      />
    </div>
  );
};

export default SearchFilter;
