import React, { useState, useEffect } from 'react';
import { Typography } from "@mui/material/";
import styles from "./ItemLine.module.css";

const ItemLine = (props) => {
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
      <div className={stopAdding ? styles.lineContainerDisabled : styles.lineContainer}>
        <Typography className={styles.productName}>{props.item.name}</Typography>
        <Typography className={styles.productBarcode}>Barkodi: {props.item.barcode}</Typography>
        <Typography className={styles.productPrice}> {props.item.price} LEK</Typography>
        <Typography className={styles.productStock}> Stoku: {props.item.stock}
        </Typography>
      </div>
    </div>
  );
};

export default ItemLine;
