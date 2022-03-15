import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
// import { useTranslation } from "react-i18next";
import IconButtonComponent from '../../../../components/Button/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import BootstrapInputField from '../../../../components/InputFields/BootstrapTextField';
import Grid from '@mui/material/Grid';
import { useState } from 'react';

const useStyles = makeStyles(() => ({
  searchInput: { display: 'block' },
  textField: { height: 40, width: '100%' },
}));

const SearchByBarcode = () => {
  const styles = useStyles();
  const [barcode, setBarcode] = useState('');

  const handleChange = (event) => {
    setBarcode(event.target.value);
  };
  const handleClearSearchField = () => {
    const barcodeParsed = parseInt(barcode);
    setBarcode('');
  };

  return (
    <div className={styles.searchContainer}>
<<<<<<< HEAD
        <Grid container columns={12}>
          <Grid item xs={10}>
            <TextField
              placeholder="addByBarcode"
              className={styles.textField}
              InputProps={{
                className: styles.textField,
              }}
              value={barcode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={2} style={{textAlign: 'right'}}>
            <IconButtonComponent
              style={{ backgroundColor: '#eeeeee', height: 40 }}
              icon={<CheckIcon />}
              iconColor={{ color: '#555555' }}
              onClick={(e) => handleClearSearchField(e)}
            />
          </Grid>
=======
      <Grid container columns={12}>
        <Grid item={true} xs={10} style={{ textAlign: 'left' }}>
          <BootstrapInputField
            placeholder="addByBarcode"
            style={{ margin: 0 }}
            value={barcode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item={true} xs={2} style={{ textAlign: 'right' }}>
          <IconButtonComponent
            style={{ backgroundColor: '#eeeeee', height: 40 }}
            icon={<CheckIcon />}
            iconColor={{ color: '#555555' }}
            onClick={(e) => handleClearSearchField(e)}
          />
>>>>>>> 32ff743070d1f2750ffb72be8f29f0ad805ac2c4
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchByBarcode;
