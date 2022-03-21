// import { useBuying } from "../../../Context/BuyingContext";
import React, { useState, useEffect } from 'react';
import IconButtonComponent from "../../../components/Button/IconButton.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PriceDescription from "./PriceDescription";
import { Divider } from "@mui/material";
import styles from "./ItemsOnBuy.module.css";
// import { useTranslation } from "react-i18next";
import SearchByBarcode from "./SearchByBarcode";
import Grid from '@mui/material/Grid';


const ItemsOnBuy = () => {
  
  const tempArraywithProducts = [
    {
        id: 1,
        name: 'Akullore Algida',
        quantity: 1,
        price: 50,
        sellingUnit: 'cope',
    },
    {
        id: 2,
        name: 'Uje Tepelene',
        quantity: 2,
        price: 60,
        sellingUnit: 'cope',
    },
    {
        id: 3,
        name: 'Patate',
        quantity: 2,
        price: 40,
        sellingUnit: 'kg',
    },
    {
        id: 4,
        name: 'Kos',
        quantity: 3,
        price: 40,
        sellingUnit: 'cope',
    },
    {
        id: 5,
        name: 'Marlboro',
        quantity: 1,
        price: 330,
    },
  ]
  const [activeInvoice, setActiveInvoice] = useState(true);
  const [activeSavedInvoices, setActiveSavedInvoices] = useState(false);
  const [invoiceProducts, setInvoiceProducts] = useState(tempArraywithProducts); //Keeps the products in the invoice list
  const [heldProducts, setHeldProducts] = useState(); //Keeps the products that will be in the current Hold Invoice
  const [savedInvoices, setSavedInvoices] = useState(); //Array with objects where objects will be all the invoices that are being held
  const [loadingInvoice, setLoadingInvoice] = useState(true); //laoding state when updating invoice sale

  useEffect(() => {
   setLoadingInvoice(false);
  }, []);

  const handleTabChanges = () => {
    setActiveSavedInvoices(!activeSavedInvoices);
    setActiveInvoice(!activeInvoice)
  }

  // const { handleRemoveProduct, buyingList, handleDestroyBuyingList } =
  //   useBuying();
  // const { t } = useTranslation();

  return (
    <div className={styles.mainHolder}>
      <Grid container columns={12} marginBottom={3}>
        <Grid item={true} xs={10} md={6} className={activeInvoice ? (styles.tabLabelActive) : (styles.tabLabelDeactive)}>
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

      {activeInvoice? (
        <>

       <SearchByBarcode />
          {loadingInvoice? (
            <>
         
            </>
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
                    &nbsp;&nbsp;
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {invoiceProducts?.map( (item, index) => {
                  <TableRow key={index}>
                      <TableCell className={styles.tableBodyCell}>
                      {index}
                    </TableCell>
                      <TableCell className={styles.tableBodyCell}>
                      {item.name}
                    </TableCell>
                      <TableCell className={styles.tableBodyCell}>
                      {item.name}
                    </TableCell>
                      <TableCell className={styles.tableBodyCell}>
                      {item.name}
                    </TableCell>
                      <TableCell className={styles.tableBodyCell}>
                      {item.name}
                    </TableCell>
                  </TableRow>
                })}


              </TableBody>

            </Table>
          </TableContainer>
            </>
          )}
          <Divider />
          <PriceDescription />
        </>
      ) : (
        <>
        
        </>
      )}
    </div>
  );
};

export default ItemsOnBuy;
