import {useEffect, useState} from 'react';
import styles from '../BottomContainer/bottomStyles.css'

const BottomContainer = (props) => {

  useEffect(() => {
  }, [props.invoiceList]);

  const [quantity, setProductQuantity] = useState(1);
  const [stopAdding, setStopAdding] = useState(false);

  const handleProductClick = (product) => {
    const isExisting = ((props.invoiceList?.filter(item => item.id === product.id)).length >= 1 ? true : false);
    if (isExisting) {
      if (quantity > Number(product.stock) && product.stockCheck) {
        setStopAdding(true);
      } else {
        setProductQuantity(quantity + 1);
        props.addToList(product, quantity);
      }
    } else {
      setProductQuantity(1);
      (Number(product.stock) == 1 ? (setStopAdding(true)) : (props.addToList(product, 1)));
    }
  }

  return (
    <>
      <div className={styles.mainDiv}>
        <span className={styles.title}>Barcode: {props.barcode}</span>
        <hr className={styles.hr} />
        <div className={styles.mainDiv}>
          {props?.searchedItem.length < 1 ? (
            <p className={styles.noData}>Nuk u gjet asnjë produkt me këtë barkod</p>
           ) : (
            <>
            {props.searchedItem.map((item, index) => {
              return(
                <>
              <p className={stopAdding ? (styles.productBlockDisabled) : (styles.productBlock)} onClick={() => {handleProductClick(item)}}>
                <span className={styles.details}><b>{index+1}) </b></span>
                <span className={styles.details}><b>{item.name}</b></span>
                <span className={styles.details}>Përshkrimi: {item.description}</span>
                <span className={styles.details}>Çmimi: {Number(item.price).toFixed(2)} ALL</span>
                <span className={styles.details}>Stoku: {item.stock}</span>
                <span className={styles.details}>Barcode: {item.barcode}</span>
              </p>
                </>
              )
            })}
               <span className={styles.results}><b>Rezultate: {props.searchedItem.length}</b></span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BottomContainer;
