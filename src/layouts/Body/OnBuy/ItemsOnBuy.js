import { useContextProduct } from "../../../Context/ProductContext";
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
// import { useTranslation } from "react-i18next";
import SearchByBarcode from "./SearchByBarcode";
import Grid from '@mui/material/Grid';
import PuffLoader from "react-spinners/PuffLoader";


const ItemsOnBuy = () => {
  const { listedInvoiceProducts } = useContextProduct(); //all invoice products from context
  const [activeInvoice, setActiveInvoice] = useState(true);
  const [activeSavedInvoices, setActiveSavedInvoices] = useState(false);
  const [invoiceProducts, setInvoiceProducts] = useState([]); //Keeps the products in the invoice list TEMP: change with listedInvoiceProducts
  const [heldProducts, setHeldProducts] = useState(); //Keeps the products that will be in the current Hold Invoice
  const [savedInvoices, setSavedInvoices] = useState(); //Array with objects where objects will be all the invoices that are being held
  const [loadingInvoice, setLoadingInvoice] = useState(true); //loading state when updating invoice sale

  useEffect(() => {
    setLoadingInvoice(false);
  }, []);

  const handleTabChanges = () => {
    setActiveSavedInvoices(!activeSavedInvoices);
    setActiveInvoice(!activeInvoice)
  }

  const removeProduct = (product) => {
      setLoadingInvoice(true);
      const newArrayWithAllInvoices = invoiceProducts.filter(item => item.id !== product.id);
      setInvoiceProducts(newArrayWithAllInvoices);
      setLoadingInvoice(false);
  }

  // const { handleRemoveProduct, buyingList, handleDestroyBuyingList } =
  //   useBuying();
  // const { t } = useTranslation();
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
          <SearchByBarcode />
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
                    {invoiceProducts.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell className={styles.tableBodyCell}>
                          {index+1}
                        </TableCell>
                        <TableCell className={styles.tableBodyCell}>
                          {row.name}
                        </TableCell>
                        <TableCell className={styles.tableBodyCell}>
                          {row.quantity}
                        </TableCell>
                        <TableCell className={styles.tableBodyCell}>
                          {row.price}
                        </TableCell>
                        <TableCell className={styles.tableBodyCell}>
                          <IconButtonComponent
                            style={{ backgroundColor: '#f05050', height: 35, width: 35 }}
                            icon={<DeleteForeverIcon />}
                            iconColor={{ color: '#fff' }}
                            onClick={() => {removeProduct(row)}}
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
