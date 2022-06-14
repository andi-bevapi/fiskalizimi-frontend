import { useInvoiceContext } from '../../../Context/InvoiceContext';
import BootstrapInputField from '../../../components/InputFields/BootstrapTextField';
import React, { useState, useEffect, useMemo } from 'react';
import IconButtonComponent from '../../../components/Button/IconButton.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PriceDescription from './PriceDescription';
import { Divider } from '@mui/material';
import styles from './ItemsOnBuy.module.css';
import SearchByBarcode from './SearchByBarcode';
import Grid from '@mui/material/Grid';
import PuffLoader from 'react-spinners/PuffLoader';
import ModalComponent from '../../../components/Modal/Modal';
import { SwalModal } from '../../../components/Modal/SwalModal';
import { useContextProduct } from '../../../Context/ProductContext';
import ReactPaginate from 'react-paginate';
import ButtonComponent from '../../../components/Button/InvoiceButton';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { useModel } from 'umi';

const ItemsOnBuy = () => {
  const {
    listedInvoiceProducts,
    addToInvoiceList,
    removeProductFromInvoiceList,
    isLoading,
    getProductBarcode,
    filteredBarcodeProduct,
    activeInvoice,
    setActiveInvoice,
    pendingInvoices,
    setPendingInvoices,
    returnInvoiceObject,
    invoiceFinalObject,
    updateInvoiceToActive,
    deletePendingInvoice,
  } = useInvoiceContext();
  const { productList } = useContextProduct();
  const { initialState } = useModel('@@initialState');
  // const [invoiceProducts, setInvoiceProducts] = useState(listedInvoiceProducts); //Keeps the products in the invoice list TEMP: change with listedInvoiceProducts
  const [heldProducts, setHeldProducts] = useState(); //Keeps the products that will be in the current Hold Invoice
  const [savedInvoices, setSavedInvoices] = useState(); //Array with objects where objects will be all the invoices that are being held
  const [loadingInvoice, setLoadingInvoice] = useState(isLoading); //loading state when updating invoice sale
  const [stopIncrement, setStopIncrement] = useState(false);
  const [stopDecrement, setStopDecrement] = useState(false);
  const [open, setOpen] = useState(false);
  const [filteredInvoice, setFilteredInvoice] = useState([]);
  const [filteredInAllPages, setFilteredInAllPages] = useState([]);
  const { t } = useTranslation();

  //---------------------paginate
  const [pageNumber, setPageNumber] = useState(0);
  const invoicePerPage = 4;
  const pagesVisited = pageNumber * invoicePerPage;
  const pageCount = Math.ceil(pendingInvoices.length / invoicePerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  //---------------------paginate

  useEffect(() => {}, [listedInvoiceProducts, filteredBarcodeProduct]);

  // useEffect(() => {
  //   if (activeInvoice == "pending") console.log("hereee");
  //   updateInvoiceToActive();
  // }, [invoiceFinalObject]);

  useEffect(() => {
    setFilteredInvoice(pendingInvoices);
  }, [pendingInvoices]);

  const handleTabChanges = () => {
    setActiveInvoice('active');
  };

  const handleTabChangesToPending = () => {
    setActiveInvoice('pending');
  };
  const incrementCount = (item) => {
    setStopDecrement(false);
    let addQuantity = item.quantity + 1;
    if (item.stockCheck) {
      // if (item.quantity >= Number(item.stock).toFixed(0)) {
      //   setStopIncrement(true);
      // } else {
      addToInvoiceList(item, addQuantity);
      // }
    } else {
      addToInvoiceList(item, addQuantity);
    }
  };

  const decrementCount = (item) => {
    //setStopIncrement(false);
    let subtractQuantity = item.quantity - 1;
    if (item.quantity == 1) {
      //setStopDecrement(true)
    } else {
      addToInvoiceList(item, subtractQuantity);
    }
  };


  const handleAmount = (e,item) =>{
    e.preventDefault();
    item.quantity = Number(e.target.value);
    addToInvoiceList(item, Number(e.target.value));
  }



  const activateInvoice = (invoice) => {
    if (!localStorage.getItem('deposit')) {
      return SwalModal(
        t('noConnectedArka'),
        '',
        'warning',
        t('close'),
        '',
        () => {},
        () => {},
      );
    }
    if (listedInvoiceProducts.length !== 0) setOpen(true);
    else {
      invoice.items.map((item) => {
        const product = productList.filter((el) => el.id == item.productId);
        addToInvoiceList(product[0], item.quantity);
      });
      updateInvoiceToActive(invoice);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const temp = pendingInvoices.filter((el) => {
      return el.description.includes(e.target.value);
    });

    if (e.target.value.length >= 1) {
      setFilteredInAllPages(temp);
    } else {
      setFilteredInAllPages([]);
    }
    setFilteredInvoice(temp);
  };

  const handleDelete = async (id) => {
    return SwalModal(
      'Deshironi ta fshini?',
      '',
      'warning',
      'JO',
      'PO',
      () => {},
      () => confirmDelete(id),
      id,
    );
  };

  const confirmDelete = async (id) => {
    const response = await deletePendingInvoice(id);
  };

  const deleteAllPendingInvoices = async () => {
    pendingInvoices.map(async (invoice) => {
      await confirmDelete(invoice.id);
    });
  };

  return (
    <div className={styles.mainHolder}>
      <Grid container columns={12} marginBottom={3}>
        <Grid
          item={true}
          xs={6}
          md={6}
          className={activeInvoice == 'active' ? styles.tabLabelActive : styles.tabLabelDeactive}
        >
          <button onClick={handleTabChanges} className={styles.tabButton}>
            <span
              className={
                activeInvoice == 'active' ? styles.tabTitleActive : styles.tabTitleDeactive
              }
            >
              {t('activeInvoice')}
            </span>
          </button>
        </Grid>
        <Grid
          item={true}
          xs={6}
          md={6}
          className={activeInvoice == 'pending' ? styles.tabLabelActive : styles.tabLabelDeactive}
        >
          <button onClick={handleTabChangesToPending} className={styles.tabButton}>
            <span
              className={
                activeInvoice == 'pending' ? styles.tabTitleActive : styles.tabTitleDeactive
              }
            >
              {t('pendingInvoice')}
            </span>
          </button>
        </Grid>
      </Grid>

      {activeInvoice == 'active' ? (
        <>
          <SearchByBarcode searchFunction={getProductBarcode} product={filteredBarcodeProduct} />
          {loadingInvoice ? (
            <div className={styles.loadingDiv}>
              <PuffLoader />
            </div>
          ) : (
            <>
              <TableContainer
                classes={{ root: styles.customTableContainer }}
                style={{ marginTop: 20 }}
              >
                <Table stickyHeader className={styles.table}>
                  <TableHead className={styles.tableMainHeader}>
                    <TableRow>
                      <TableCell className={styles.tableHead} id={styles['number']}>
                        {t('no')}
                      </TableCell>
                      <TableCell className={styles.tableHead} id={styles['name']}>
                        {t('product')}
                      </TableCell>
                      <TableCell className={styles.tableHead} id={styles['quantity']}>
                        {t('quantity')}
                      </TableCell>
                      <TableCell className={styles.tableHead} id={styles['price']}>
                        {t('price')}
                      </TableCell>
                      <TableCell className={styles.tableHead} id={styles['total']}>
                        {t('total')}
                      </TableCell>
                      <TableCell className={styles.tableHead} id={styles['delete']}>
                        &nbsp;
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {listedInvoiceProducts?.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className={styles.tableBodyCell}>{index + 1}</TableCell>
                        <TableCell className={styles.tableBodyCell}>{item.name}</TableCell>
                        <TableCell className={styles.tableBodyCell} style={{ padding: '2px' }}>
                          <TextField
                            onChange={(e)=>{handleAmount(e,item)}}
                            type="number"
                            InputProps={{
                              inputProps: {
                                //nqs kemi stock check max i produktit te jete sa stock i produktit aktual
                                //minimumi nuk duhet te jet 0 asnjehere
                                max: 100,
                                min: 1,
                              },
                            }}
                            value={item.quantity}
                            label={t("quantity")}
                          />
                        </TableCell>
                        <TableCell className={styles.tableBodyCell}>
                          {Number(item.price).toFixed(2)}
                        </TableCell>
                        <TableCell className={styles.tableBodyCell} style={{ padding: '2px' }}>
                          &nbsp; {Number(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell className={styles.tableBodyCell}>
                          <IconButtonComponent
                            style={{ backgroundColor: '#f05050', height: 35, width: 35 }}
                            icon={<DeleteForeverIcon />}
                            iconColor={{ color: '#fff' }}
                            onClick={() => {
                              removeProductFromInvoiceList(item);
                            }}
                            text={t('delete')}
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
          <BootstrapInputField
            placeholder={t('search')}
            style={{ marginTop: 20, marginBottom: 20 }}
            onChange={handleChange}
          />
          <TableContainer className={styles.tableContainer}>
            <Table stickyHeader>
              <TableHead className={styles.tableMainHeader}>
                <TableRow>
                  <TableCell className={styles.tableHead} id={styles['invoiceKode']}>
                    {t('code')}
                  </TableCell>
                  <TableCell className={styles.tableHead} id={styles['name']}>
                    {t('product')}
                  </TableCell>
                  <TableCell className={styles.tableHead} id={styles['price']}>
                    {t('totalPrice')}
                  </TableCell>
                  <TableCell className={styles.tableHead} id={styles['delete']}>
                    &nbsp;
                  </TableCell>
                  <TableCell className={styles.tableHead} id={styles['delete']}>
                    &nbsp;
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredInAllPages?.length > 0
                  ? filteredInAllPages.map((el) => {
                      return (
                        <TableRow key={el.id}>
                          <TableCell className={styles.tableBodyCell} id={styles['invoiceKode']}>
                            {el.description}
                          </TableCell>
                          <TableCell className={styles.tableBodyCell}>{el.items.length}</TableCell>
                          <TableCell className={styles.tableBodyCell}>{el.totalAmount} </TableCell>
                          <TableCell className={styles.tableBodyCell}>
                            <IconButtonComponent
                              style={{ backgroundColor: '#12AC7A', height: 35, width: 35 }}
                              icon={<ShoppingCartIcon />}
                              iconColor={{ color: '#fff' }}
                              onClick={() => {
                                activateInvoice(el);
                              }}
                            />
                          </TableCell>
                          <TableCell className={styles.tableBodyCell}>
                            <IconButtonComponent
                              style={{ backgroundColor: '#f05050', height: 35, width: 35 }}
                              icon={<DeleteForeverIcon />}
                              iconColor={{ color: '#fff' }}
                              onClick={() => {
                                handleDelete(el.id);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : filteredInvoice.slice(pagesVisited, pagesVisited + invoicePerPage).map((el) => {
                      return (
                        <TableRow key={el.id}>
                          <TableCell className={styles.tableBodyCell}>{el.description}</TableCell>
                          <TableCell className={styles.tableBodyCell}>{el.items.length}</TableCell>
                          <TableCell className={styles.tableBodyCell}>{el.totalAmount} </TableCell>
                          <TableCell className={styles.tableBodyCell}>
                            <IconButtonComponent
                              style={{ backgroundColor: '#12AC7A', height: 35, width: 35 }}
                              icon={<ShoppingCartIcon />}
                              iconColor={{ color: '#fff' }}
                              onClick={() => {
                                activateInvoice(el);
                              }}
                              text={t('addCart')}
                            />
                          </TableCell>
                          <TableCell className={styles.tableBodyCell}>
                            <IconButtonComponent
                              style={{ backgroundColor: '#f05050', height: 35, width: 35 }}
                              icon={<DeleteForeverIcon />}
                              iconColor={{ color: '#fff' }}
                              onClick={() => {
                                handleDelete(el.id);
                              }}
                              text={t('delete')}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <ReactPaginate
            previousLabel={t('previous')}
            nextLabel={t('next')}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={styles.paginationButtons}
            previousLinkClassName={styles.previousButtons}
            nextLinkClassName={styles.nextButtons}
            disabledClassName={styles.paginationDisabled}
            activeClassName={styles.paginationActive}
          />
          <Divider />
          <div className={styles.bottomButtonContainer}>
            <ButtonComponent
              title="FSHI"
              lightColor="rgb(240, 80, 80)"
              addIcon={false}
              onClick={deleteAllPendingInvoices}
              icon={<DeleteForeverIcon />}
            />
          </div>
        </>
      )}
      <ModalComponent open={open} handleClose={handleClose} title="Kujdes">
        <div className={styles.tabTitleDeactive}>
          {t('activeInvoiceHasProuct')} <br></br>
          {t('ifYouWantYouCanDelete')}
        </div>
      </ModalComponent>
    </div>
  );
};

export default ItemsOnBuy;
