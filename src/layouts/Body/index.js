import ItemsOnBuy from './OnBuy/ItemsOnBuy.js';
// import ItemsOnStock from './ItemsOnStock/ItemsOnStock';
import styles from './Body.module.css';
// import Transactions from './Transactions/Transactions';
import Grid from '@mui/material/Grid';

const Body = (props) => {
  //   const { open } = useSettingsContext();

  return (
    <Grid container columnSpacing={2} rowSpacing={2} className={styles.wrapper}>
      <Grid item xs={6} md={8}>
        <span className={styles.contentTitle}>&nbsp;</span>
        <div className={styles.itemsOnStock}>
          {props.children}
        </div>
      </Grid>
      <Grid item xs={6} md={4}>
        <span className={styles.contentTitle}>&nbsp;</span>
        <div className={styles.itemsOnBuy}>
          <ItemsOnBuy />
        </div>
      </Grid>
    </Grid>
   );
};

export default Body;
