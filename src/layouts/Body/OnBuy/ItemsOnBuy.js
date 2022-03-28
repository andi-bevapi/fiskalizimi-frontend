import { useInvoiceContext } from "../../../Context/InvoiceContext";
import React, { useState, useEffect } from 'react';
import IconButtonComponent from "../../../components/Button/IconButton.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PriceDescription from "./PriceDescription";
import { Divider } from "@mui/material";
import styles from "./ItemsOnBuy.module.css";
import SearchByBarcode from "./SearchByBarcode";
import Grid from '@mui/material/Grid';
import PuffLoader from "react-spinners/PuffLoader";



const ItemsOnBuy = () => {
  const { listedInvoiceProducts, addToInvoiceList, removeProductFromInvoiceList, isLoading, getProductBarcode, filteredBarcodeProduct } = useInvoiceContext();
  const [activeInvoice, setActiveInvoice] = useState(true);
  const [activeSavedInvoices, setActiveSavedInvoices] = useState(false);
  // const [invoiceProducts, setInvoiceProducts] = useState(listedInvoiceProducts); //Keeps the products in the invoice list TEMP: change with listedInvoiceProducts
  const [heldProducts, setHeldProducts] = useState(); //Keeps the products that will be in the current Hold Invoice
  const [savedInvoices, setSavedInvoices] = useState(); //Array with objects where objects will be all the invoices that are being held
  const [loadingInvoice, setLoadingInvoice] = useState(isLoading); //loading state when updating invoice sale
  const [stopIncrement, setStopIncrement] = useState(false);
  const [stopDecrement, setStopDecrement] = useState(false);

  useEffect(() => {

  }, [listedInvoiceProducts, filteredBarcodeProduct]);

  const handleTabChanges = () => {
    setActiveSavedInvoices(!activeSavedInvoices);
    setActiveInvoice(!activeInvoice)
  }
  const incrementCount = (item) => {
    setStopDecrement(false);
    let addQuantity = item.quantity + 1;
    if (item.stockCheck) {
      if (item.quantity >= Number(item.stock).toFixed(0)) {
        setStopIncrement(true)
      } else {
        addToInvoiceList(item, addQuantity);
      }
    } else {
      addToInvoiceList(item, addQuantity);
    }
  }

  const decrementCount = (item) => {
    //setStopIncrement(false);
    let subtractQuantity = item.quantity - 1;
    if (item.quantity == 1) {
      //setStopDecrement(true)
    } else {
      addToInvoiceList(item, subtractQuantity);
    }
  }

  return (
    <div className={styles.mainHolder}>
      <Grid container columns={12} marginBottom={3}>
        <Grid item={true} xs={6} md={6} className={activeInvoice ? (styles.tabLabelActive) : (styles.tabLabelDeactive)}>
          <button onClick={handleTabChanges} className={styles.tabButton}>
            <span className={activeInvoice ? (styles.tabTitleActive) : (styles.tabTitleDeactive)}>Fatura Aktive</span>
          </button>
        </Grid>
        <Grid item={true} xs={6} md={6} className={activeSavedInvoices ? (styles.tabLabelActive) : (styles.tabLabelDeactive)}>
          <button onClick={handleTabChanges} className={styles.tabButton}>
            <span className={activeSavedInvoices ? (styles.tabTitleActive) : (styles.tabTitleDeactive)}>Fatura te ruajtura</span>
          </button>

        </Grid>
      </Grid>

      {activeInvoice ? (
        <>
          <SearchByBarcode searchFunction={getProductBarcode} product={filteredBarcodeProduct}/>
          {loadingInvoice ? (
            <div className={styles.loadingDiv}>
              <PuffLoader />
            </div>
          ) : (
            <>
              <TableContainer classes={{ root: styles.customTableContainer }} style={{ marginTop: 20 }}>
                <Table stickyHeader className={styles.table}>
                  <TableHead className={styles.tableMainHeader}>
                    <TableRow>
                      <TableCell className={styles.tableHead}>Nr.</TableCell>
                      <TableCell className={styles.tableHead} id={styles["name"]}>
                        Produkti
                      </TableCell>
                      <TableCell className={styles.tableHead} id={styles["quantity"]}>
                        Sasia
                      </TableCell>
                      <TableCell className={styles.tableHead} id={styles["price"]}>
                        Çmimi
                      </TableCell>
                      <TableCell className={styles.tableHead} id={styles["delete"]}>
                        &nbsp;
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {listedInvoiceProducts?.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className={styles.tableBodyCell}>
                          {index + 1}
                        </TableCell>
                        <TableCell className={styles.tableBodyCell}>
                          {item.name}
                        </TableCell>
                        <TableCell className={styles.tableBodyCell}>
                          <button className={styles.valueButton} onClick={() => { decrementCount(item) }}>-</button>
                          &nbsp; {item.quantity} &nbsp;
                          <button className={styles.valueButton} onClick={() => { incrementCount(item) }}>+</button>
                        </TableCell>
                        <TableCell className={styles.tableBodyCell}>
                          &nbsp;  {Number(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell className={styles.tableBodyCell}>
                          <IconButtonComponent
                            style={{ backgroundColor: '#f05050', height: 35, width: 35 }}
                            icon={<DeleteForeverIcon />}
                            iconColor={{ color: '#fff' }}
                            onClick={() => { removeProductFromInvoiceList(item) }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                </Table>
              </TableContainer>
            </>
          )}
          <Divider />
          <PriceDescription invoiceList={listedInvoiceProducts} />
        </>
      ) : (
        <>

        </>
      )}
    </div>
  );
};

export default ItemsOnBuy;
