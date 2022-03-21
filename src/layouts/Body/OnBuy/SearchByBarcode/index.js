import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
// import { useTranslation } from "react-i18next";
import IconButtonComponent from '../../../../components/Button/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import BootstrapInputField from '../../../../components/InputFields/BootstrapTextField';
import Grid from '@mui/material/Grid';
import { React, useState, useCallback} from 'react';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import BottomContainer from './../../../../components/BottomContainer';
import Drawer from "react-bottom-drawer";

const useStyles = makeStyles(() => ({
  searchInput: { display: 'block' },
  textField: { height: 40, width: '100%' },
  drawerStyle: { padding: 40 }
}));

const SearchByBarcode = () => {
  const styles = useStyles();
  const [barcode, setBarcode] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const openDrawer = useCallback(() => setIsVisible(true), []);
  const closeDrawer = useCallback(() => setIsVisible(false), []);

  const handleChange = (event) => {
    setBarcode(event.target.value);
  };
  // const handleClearSearchField = () => {
  //   const barcodeParsed = parseInt(barcode);
  //   setBarcode('');
  // }

  return (
      <div className={styles.searchContainer}>
        <Grid container columns={12}>
          <Grid item={true} xs={10} md={4} style={{ textAlign: 'left' }}>
            <BootstrapInputField
              placeholder="Kërko sipas barkodit"
              style={{ margin: 0}}
              value={barcode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item={true} xs={2} md={6}>
            <IconButtonComponent
              style={{ backgroundColor: '#12AC7A', height: 40, width: 40 }}
              icon={<ManageSearchIcon />}
              iconColor={{ color: '#fff' }}
              onClick={openDrawer}
            />
          </Grid>
        </Grid>
          <>
            <Drawer
                duration={250}
                hideScrollbars={false}
                onClose={closeDrawer}
                isVisible={isVisible}
                className={styles.drawerStyle}
              >
                <BottomContainer />
              </Drawer>
          </>
      </div>
  );
};

export default SearchByBarcode;
