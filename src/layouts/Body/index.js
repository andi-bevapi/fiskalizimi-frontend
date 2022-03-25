import ItemsOnBuy from './OnBuy/ItemsOnBuy.js';
// import ItemsOnStock from './ItemsOnStock/ItemsOnStock';
import styles from './Body.module.css';
// import Transactions from './Transactions/Transactions';
import Grid from '@mui/material/Grid';
import { InvoiceProvider } from '../../Context/InvoiceContext.js';

const Body = (props) => {
  //   const { open } = useSettingsContext();
  return (
    <Grid container columnSpacing={2} rowSpacing={2} className={styles.wrapper}>
      <Grid item xs={12} md={8}>
        <div className={styles.itemsOnStock}>
          {props.children}
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <div className={styles.itemsOnBuy}>
          <ItemsOnBuy />
        </div>
      </Grid>
    </Grid>
  );
};

export default Body;
