import { useEffect } from 'react';
import { Typography } from "@mui/material";
import styles from "./PriceInformations.module.css";
import { makeStyles } from "@mui/styles";
import { useInvoiceContext } from "../../../../../Context/InvoiceContext";

const PriceInformations = (props) => {
  const { totalPriceVAT, getTotalPriceWithVAT, listedInvoiceProducts, totalPriceNoVAT, getTotalPriceWithoutVAT } = useInvoiceContext();
  const buyingList = [...props.invoiceList];
  const totalPrice = 0;

  useEffect(() => {
    getTotalPriceWithVAT();
    getTotalPriceWithoutVAT();
  }, [listedInvoiceProducts]);

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
           Vlera pa TVSH:
        </Typography>
        <div>
          {buyingList.length === 0 ? (
            <Typography variant="body2" className={styles.text}>
              <b>0.00ALL</b>
            </Typography>
          ) : (
            <Typography variant="body2" className={styles.text}>
              <b>{Number(totalPriceNoVAT).toFixed(2)}ALL</b>
            </Typography>
          )}
        </div>
      </div>
      <div className={styles.vatPriceHolder}>
        <Typography
          variant="body2"
          className={styles.text}
        >
          Vlera me TVSH:
        </Typography>
        <div>
          {buyingList.length === 0 ? (
            <Typography variant="body2" className={styles.text}>
             <b>0.00ALL</b>
            </Typography>
          ) : (
            <Typography variant="body" className={styles.text}>
              <b>{Number(totalPriceVAT).toFixed(2)}ALL</b>
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceInformations;
