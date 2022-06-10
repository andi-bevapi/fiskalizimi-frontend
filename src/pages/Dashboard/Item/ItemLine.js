import React, { useState, useEffect } from 'react';
import { Grid, Typography } from "@mui/material/";
import styles from "./ItemLine.module.css";
import { SwalModal } from '../../../components/Modal/SwalModal';
import { useTranslation } from "react-i18next";
import { useModel } from 'umi';

const ItemLine = (props) => {
  const { initialState } = useModel('@@initialState');

  const {t} = useTranslation();
  const [product, setProduct] = useState(props.item);
  const [quantity, setProductQuantity] = useState();
  const [stopAdding, setStopAdding] = useState(false);

  useEffect(() => {
    const arrayProduct = (props.invoiceList?.filter(item => item.id === props.item.id));
    
    (arrayProduct[0]?.stockCheck ? (
      (arrayProduct[0].quantity >= Number(product.stock).toFixed(0) ? (setStopAdding(true)) : (setStopAdding(false)))
    ) : (
      (product.stockCheck ? (
            Number(product.stock).toFixed(0) == 0 ? (setStopAdding(true)) : (setStopAdding(false))
        ): setStopAdding(false) )
    ));
    // ((props.invoiceList?.filter(item => item.id === props.item.id)).length >= 1 ? null : setStopAdding(false));
  }, [props.invoiceList],props.item);

  const handleCardClick = () => {
    if (!localStorage.getItem('deposit')) {
      return SwalModal(
        t("noConnectedArka"),
        "",
        "warning",
        t("close"),
        "",
        () => { },
        () => { },
      );
    }
    if (!stopAdding) {
      const productFromArray = (props.invoiceList?.filter(item => item.id === props.item.id));
      const isExisting = (productFromArray.length >= 1 ? true : false);
      if (product.stockCheck) {
        if (isExisting) {
          // if (productFromArray[0]?.quantity >= Number(product.stock).toFixed(0)) {
          //   setStopAdding(true);
          // } else {
            setProductQuantity(productFromArray[0].quantity + 1);
            props.addToInvoiceList(product, productFromArray[0].quantity + 1);
          // }
        } else {
          setProductQuantity(1);
          props.addToInvoiceList(product, 1);
          (Number(product.stock) == 1 ? (setStopAdding(true)) : (setStopAdding(false)));
        }
      } else {
        if (isExisting) {
          setProductQuantity(productFromArray[0].quantity + 1);
          props.addToInvoiceList(product, productFromArray[0].quantity + 1);
        } else {

          setProductQuantity(1);
          // (Number(product.stock) == 1 ? (setStopAdding(true)) : (props.addToInvoiceList(product, 1)));
          props.addToInvoiceList(product, 1);
        }
      }
    }
  }

  return (
    <div className={styles.container}
      onClick={() => handleCardClick()}
    >
      <Grid className={stopAdding ? styles.lineContainerDisabled : styles.lineContainer}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography className={styles.productName} align={'left'}>{props.item.name}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography className={styles.productBarcode} align={'right'}>{t('Barcode')}: {props.item.barcode}</Typography>
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={8}>
        <Typography className={styles.productPrice} align={'right'}> {props.item.price} LEK</Typography>
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={8}>
        <Typography className={styles.productStock} align={'left'}> {t('Stock')}: {props.item.stock}
        {initialState?.currentUser?.branchId === 0 &&
          <Typography className={styles.productBarcode}>{t('branch')}: {props.item.branch.name}</Typography>}
        </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ItemLine;
