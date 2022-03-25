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
  const { listedInvoiceProducts, addToInvoiceList, removeProductFromInvoiceList } = useInvoiceContext();
  const [activeInvoice, setActiveInvoice] = useState(true);
  const [activeSavedInvoices, setActiveSavedInvoices] = useState(false);
  // const [invoiceProducts, setInvoiceProducts] = useState(listedInvoiceProducts); //Keeps the products in the invoice list TEMP: change with listedInvoiceProducts
  const [heldProducts, setHeldProducts] = useState(); //Keeps the products that will be in the current Hold Invoice
  const [savedInvoices, setSavedInvoices] = useState(); //Array with objects where objects will be all the invoices that are being held
  const [loadingInvoice, setLoadingInvoice] = useState(false); //loading state when updating invoice sale

  useEffect(() => {
    
  }, [listedInvoiceProducts]);

  const handleTabChanges = () => {
    setActiveSavedInvoices(!activeSavedInvoices);
    setActiveInvoice(!activeInvoice)
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
                    {listedInvoiceProducts?.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell className={styles.tableBodyCell}>
                          {index + 1}
                        </TableCell>
                        <TableCell className={styles.tableBodyCell}>
                          {row.name}
                        </TableCell>
                        <TableCell className={styles.tableBodyCell}>
                          &nbsp; {row.quantity}
                        </TableCell>
                        <TableCell className={styles.tableBodyCell}>
                          &nbsp;  {row.price}
                        </TableCell>
                        <TableCell className={styles.tableBodyCell}>
                          <IconButtonComponent
                            style={{ backgroundColor: '#f05050', height: 35, width: 35 }}
                            icon={<DeleteForeverIcon />}
                            iconColor={{ color: '#fff' }}
                            onClick={() => { removeProductFromInvoiceList(row) }}
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
