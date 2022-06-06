import React  from 'react';
import ItemsOnBuy from './OnBuy/ItemsOnBuy.js';
// import ItemsOnStock from './ItemsOnStock/ItemsOnStock';
import styles from './Body.module.css';
// import Transactions from './Transactions/Transactions';
import Grid from '@mui/material/Grid';
import { useModel } from 'umi';
import Admin from '../SuperAdmin/index';

const Body = (props) => {
  const { initialState } = useModel('@@initialState');

  return (
    <Grid container columnSpacing={2} rowSpacing={2} className={styles.wrapper}>
      {initialState?.currentUser?.branchId !== 0 ? (
        <>
          <Grid item xs={12} md={8}>
            <div className={styles.itemsOnStock}>{props.children}</div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={styles.itemsOnBuy}>
              <ItemsOnBuy />
            </div>
          </Grid>
        </>
      ) : initialState?.currentUser?.branchId === 0 &&
        (initialState?.currentUser?.clientId !== 0 || localStorage.getItem('clientId')) ? (
        <Grid item xs={12} md={12}>
          <div className={styles.itemsOnStock}>{props.children}</div>
        </Grid>
      ) : (
        <Grid item xs={12} md={12}>
          <div className={styles.itemsOnStock}>
            <Admin />
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default Body;
