import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
// import { useTranslation } from "react-i18next";
import IconButtonComponent from '../../../../components/Button/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import BootstrapInputField from '../../../../components/InputFields/BootstrapTextField';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
// import { useProducts } from "../../../Context/productsContext";
// import {useBuying} from "../../../Context/BuyingContext";

const useStyles = makeStyles(() => ({
  searchInput: { display: 'block' },
  textField: { height: 40, width: '100%' },
}));

const SearchByBarcode = () => {
  // const { t } = useTranslation();
  const styles = useStyles();
  const [barcode, setBarcode] = useState('');
  // const { products } = useProducts();
  // const { addToBuyingList } = useBuying();

  const handleChange = (event) => {
    setBarcode(event.target.value);
  };
  const handleClearSearchField = () => {
    const barcodeParsed = parseInt(barcode);
    // const productsByBarcode = products.filter((el)=>el.barcode === barcodeParsed);
    // if(productsByBarcode.length > 0 ){
    //   addToBuyingList(productsByBarcode[0]);
    // }
    setBarcode('');
  };
  return (
    <div className={styles.searchContainer}>
      <Grid container columns={12}>
        <Grid xs={10} style={{ textAlign: 'left' }}>
          <BootstrapInputField
            placeholder="addByBarcode"
            style={{ margin: 0}}
            InputProps={{
              className: styles.textField,
            }}
            value={barcode}
            onChange={handleChange}
          />
        </Grid>
        <Grid xs={2} style={{ textAlign: 'right' }}>
          <IconButtonComponent
            style={{ backgroundColor: '#eeeeee', height: 40 }}
            icon={<CheckIcon />}
            iconColor={{ color: '#555555' }}
            onClick={(e) => handleClearSearchField(e)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchByBarcode;
