import ItemsOnBuy from './OnBuy/ItemsOnBuy.js';
// import ItemsOnStock from './ItemsOnStock/ItemsOnStock';
import styles from './Body.module.css';
// import Transactions from './Transactions/Transactions';
import { history } from 'umi';

const Body = (props) => {
  //   const { open } = useSettingsContext();
  const changeroute = () => {
    history.push('/produktet');
  };
  return (
    <div className={styles.mainHolder}>
      <div className={styles.itemsOnStock}>
        <button onClick={changeroute}>change routes</button>
        {props.children}
      </div>
      <div className={styles.itemsOnBuy}>
        <ItemsOnBuy />
      </div>
    </div>
  );
};

export default Body;
