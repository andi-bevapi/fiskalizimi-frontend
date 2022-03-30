import {useEffect, useState} from 'react';
import styles from '../BottomContainer/bottomStyles.css'
import ProductItem from './productItem';

const BottomContainer = (props) => {

  useEffect(() => {

  }, [props.invoiceList]);

  return (
    <>
      <div className={styles.mainDiv}>
        <span className={styles.title}>Barkodi: {props.barcode}</span>
        <hr className={styles.hr} />
        <div className={styles.mainDiv}>
          {props?.searchedItem.length < 1 ? (
            <p className={styles.noData}>Nuk u gjet asnjë produkt me këtë barkod</p>
           ) : (
            <>
            {props.searchedItem.map((item, index) => {
              return(
                   <ProductItem key={index} index={index} item={item} addToList={props.addToList} invoiceList={props.invoiceList}/>
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
