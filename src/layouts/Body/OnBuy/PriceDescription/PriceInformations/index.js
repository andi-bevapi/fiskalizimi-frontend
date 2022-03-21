import { Typography } from "@mui/material";
// import { useBuying } from "../../../../../Context/BuyingContext";
import styles from "./PriceInformations.module.css";
// import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";

const PriceInformations = () => {
  // const { buyingList, totalPrice } = useBuying();
  // const { t } = useTranslation();
  const buyingList = [];

  return (
    <div className={styles.mainHolder}>
      <div className={styles.itemsHolder}>
        <Typography variant="body2" className={styles.text}>
         produkte:
        </Typography>
        <div className={styles.text}>
           <b>{buyingList.length}</b>
          {/* {buyingList.length === 0 ? <div>0</div> : <div>{buyingList.length}</div>} */}
        </div>
      </div>
      <div className={styles.noVatPriceHolder}>
        <Typography variant="body2" className={styles.text}>
           Çmimi pa TVSH:
        </Typography>
        <div>
          {buyingList.length === 0 ? (
            <Typography variant="body2" className={styles.text}>
              <b>0.0ALL</b>
            </Typography>
          ) : (
            <Typography variant="body2" className={styles.text}>
              <b>{Number(totalPrice).toFixed(2)}ALL</b>
            </Typography>
          )}
        </div>
      </div>
      <div className={styles.vatPriceHolder}>
        <Typography
          variant="body2"
          className={styles.text}
        >
          Çmimi me TVSH:
        </Typography>
        <div>
          {buyingList.length === 0 ? (
            <Typography variant="body2" className={styles.text}>
             <b>0.0ALL</b>
            </Typography>
          ) : (
            <Typography variant="body" className={styles.text}>
              <b>{Number(totalPrice + totalPrice * 0.2).toFixed(2)}ALL</b>
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceInformations;
