import ItemsOnBuy from './OnBuy/ItemsOnBuy.js';
// import ItemsOnStock from './ItemsOnStock/ItemsOnStock';
import styles from './Body.module.css';
// import Transactions from './Transactions/Transactions';
import { history } from 'umi';

const Body = (props) => {
  //   const { open } = useSettingsContext();
  const changerouteProduct = () => {
    history.push('/produktet');
  };
  const changerouteHome = () => {
    history.push('/');
  };
  return (
    <div className={styles.mainHolder}>
      <div className={styles.itemsOnStock}>
        <button onClick={changerouteProduct}>products</button>
        <button onClick={changerouteHome}>home</button>
        {props.children}
      </div>
      <div className={styles.itemsOnBuy}>
        <ItemsOnBuy />
      </div>
    </div>
  );
};

export default Body;
