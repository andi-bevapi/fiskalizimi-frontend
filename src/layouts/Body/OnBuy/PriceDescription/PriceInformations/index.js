import { Typography } from "@mui/material";
// import { useBuying } from "../../../../../Context/BuyingContext";
import styles from "./PriceInformations.module.css";
// import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    fontFamily:
      '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: "14px",
  },
}));

const PriceInformations = () => {
  const classes = useStyles();
  // const { buyingList, totalPrice } = useBuying();
  // const { t } = useTranslation();
  const buyingList = [];

  return (
    <div className={styles.mainHolder}>
      <div className={styles.itemsHolder}>
        <Typography variant={"body2"} className={classes.text}>
         products:
        </Typography>
        <div className={classes.text}>
          {buyingList.length === 0 ? <p>0</p> : <p>{buyingList.length}</p>}
        </div>
      </div>
      <div className={styles.noVatPriceHolder}>
        <Typography variant="body2" className={classes.text}>
          price paTVSH:
        </Typography>
        <div>
          {buyingList.length === 0 ? (
            <Typography variant="body2" className={classes.text}>
              0.0ALL
            </Typography>
          ) : (
            <Typography variant="body2" className={classes.text}>
              {Number(totalPrice).toFixed(2)}ALL
            </Typography>
          )}
        </div>
      </div>
      <div className={styles.vatPriceHolder}>
        <Typography
          variant="body2"
          className={classes.text}
        >
          "meTVSH":
        </Typography>
        <div>
          {buyingList.length === 0 ? (
            <Typography variant="body2" className={classes.text}>
              0.0ALL
            </Typography>
          ) : (
            <Typography variant="body" className={classes.text}>
              {Number(totalPrice + totalPrice * 0.2).toFixed(2)}ALL
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceInformations;
