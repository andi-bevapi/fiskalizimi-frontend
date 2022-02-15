import ItemsOnBuy from './OnBuy/ItemsOnBuy.js';
// import ItemsOnStock from './ItemsOnStock/ItemsOnStock';
import styles from './Body.module.css';
// import Transactions from './Transactions/Transactions';

const Body = (props) => {
  //   const { open } = useSettingsContext();

  return (
    <div className={styles.mainHolder}>
      <div className={styles.itemsOnStock}>
        {props.children}
      </div>
      <div className={styles.itemsOnBuy}>
        <ItemsOnBuy />
      </div>
    </div>
  );
};

export default Body;
