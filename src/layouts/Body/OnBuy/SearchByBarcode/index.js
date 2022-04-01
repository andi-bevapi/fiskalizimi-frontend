import { makeStyles } from '@mui/styles';
import IconButtonComponent from '../../../../components/Button/IconButton';
import BootstrapInputField from '../../../../components/InputFields/BootstrapTextField';
import Grid from '@mui/material/Grid';
import { React, useState, useCallback, useEffect } from 'react';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import BottomContainer from './../../../../components/BottomContainer';
import Drawer from "react-bottom-drawer";
import { useInvoiceContext } from '../../../../Context/InvoiceContext';
import { useContextProduct } from '../../../../Context/ProductContext';
import { SwalModal } from '../../../../components/Modal/SwalModal';

const useStyles = makeStyles(() => ({
  searchInput: { display: 'block' },
  textField: { height: 40, width: '100%' },
  drawerStyle: { padding: 40 }
}));

const SearchByBarcode = (props) => {
  const styles = useStyles();
  const { listedInvoiceProducts, addToInvoiceList } = useInvoiceContext();
  const { getProductByBarcode } = useContextProduct();
  const [barcode, setBarcode] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState({});

  const [scannedProduct, setScannedProduct] = useState({});
  const [stopAddingProduct, setStopAddingProduct] = useState(false);
  const [hasBarcodeData, setHasBarcodeData] = useState(false);

  const openDrawer = useCallback(() => setIsVisible(true), []);
  const closeDrawer = useCallback(() => setIsVisible(false), []);

  useEffect(() => {

  }, [listedInvoiceProducts])

  const handleChange = (event) => {
    setBarcode(event.target.value);
  };

  const handleSearchField = () => {
    (barcode.length == 0 ? null : (searchByBarcode()))
  }

  const searchByBarcode = async () => {
    const searchedProductBarcode = await props.searchFunction(barcode);
    setSearchedProducts(searchedProductBarcode);
    openDrawer();
  }

  const checkKeyPressed = (event) => {
    (event.key === 'Enter' ? (scanBarcode()) : null);
  }

  const scanBarcode = async () => {
    const product = await getProductByBarcode(barcode);
    if (product) {
      if (Number(product.stock).toFixed(0) != 0) {
        setScannedProduct(product)
        setHasBarcodeData(true);
        const productFromInvoice = listedInvoiceProducts?.filter(item => item.id === product.id);
        if (productFromInvoice.length > 0) {
          if (productFromInvoice[0].stockCheck) {
            if (productFromInvoice[0].quantity >= product.stock) {
              setStopAddingProduct(true);
            } else {
              addToInvoiceList(product, productFromInvoice[0].quantity + 1);
            }
          } else {
            addToInvoiceList(product, productFromInvoice[0].quantity + 1);
          }
        } else {
          addToInvoiceList(product, 1)
        }
      }else{
        setHasBarcodeData(false);
        handleSwalNoStock();
      }
    } else {
      setHasBarcodeData(false);
      handleSwal();
    }
  }

  const handleSwal = async () => {
    return SwalModal(
      "Nuk u gjet asnjë produkt me këtë barkod!",
      "",
      "warning",
      "Mbyll",
      "",
      () => { },
      () => { },
    );
  };

  const handleSwalNoStock = async () => {
    return SwalModal(
      "Ky produkt nuk ka stok",
      "",
      "warning",
      "Mbyll",
      "",
      () => { },
      () => { },
    );
  };

  return (
    <div className={styles.searchContainer}>
      <Grid container columns={12} marginBottom={1} spacing={0}>
        <Grid item={true} xs={10} md={10} style={{ textAlign: 'left', width: '90% !important' }}>
          <BootstrapInputField
            placeholder="Skano barkod"
            style={{ margin: 0 }}
            value={barcode}
            onChange={handleChange}
            onKeyDown={checkKeyPressed}
          />
        </Grid>
        <Grid item={true} xs={2} md={2}>
          <IconButtonComponent
            style={{ backgroundColor: '#12AC7A', height: 40, width: 40 }}
            icon={<ManageSearchIcon />}
            iconColor={{ color: '#fff' }}
            onClick={handleSearchField}
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
          <BottomContainer searchedItem={searchedProducts} barcode={barcode} addToList={addToInvoiceList} invoiceList={listedInvoiceProducts} />
        </Drawer>
      </>
    </div>
  );
};

export default SearchByBarcode;
