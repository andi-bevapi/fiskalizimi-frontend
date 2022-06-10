import { useEffect } from 'react';
import { Grid, Typography } from "@mui/material";
import styles from "./PriceInformations.module.css";
import { makeStyles } from "@mui/styles";
import { useInvoiceContext } from "../../../../../Context/InvoiceContext";
import { useTranslation } from 'react-i18next';

const PriceInformations = (props) => {
  const { t } = useTranslation();
  const { totalPriceVAT, getTotalPriceWithVAT, listedInvoiceProducts, totalAmountNoVAT, getTotalPriceWithoutVAT } = useInvoiceContext();
  const buyingList = [...props.invoiceList];
  const totalPrice = 0;

  useEffect(() => {
    getTotalPriceWithVAT();
    getTotalPriceWithoutVAT();
  }, [listedInvoiceProducts]);

  return (
    <Grid container>
      <div className={styles.mainHolder}>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <div className={styles.itemsHolder}>
            <Typography variant="body2" className={styles.text}>
              {t("products")}
            </Typography>
            <div className={styles.text}>
              <b>{buyingList.length}</b>
              {/* {buyingList.length === 0 ? <div>0</div> : <div>{buyingList.length}</div>} */}
            </div>
          </div>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <div className={styles.noVatPriceHolder}>
            <Typography variant="body2" className={styles.text}>
              {t("priceWithoutVat")}
            </Typography>
            <div>
              {buyingList.length === 0 ? (
                <Typography variant="body2" className={styles.text}>
                  <b>0.00 {t("currency")}</b>
                </Typography>
              ) : (
                <Typography variant="body2" className={styles.text}>
                  <b>{Number(totalAmountNoVAT).toFixed(2)} {t("currency")}</b>
                </Typography>
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <div className={styles.vatPriceHolder}>
            <Typography
              variant="body2"
              className={styles.text}
            >
              {t("priceWithVat")}
            </Typography>
            <div>
              {buyingList.length === 0 ? (
                <Typography variant="body2" className={styles.text}>
                  <b>0.00 {t("currency")}</b>
                </Typography>
              ) : (
                <Typography variant="body" className={styles.text}>
                  <b>{Number(totalPriceVAT).toFixed(2)} {t("currency")}</b>
                </Typography>
              )}
            </div>
          </div>
        </Grid>
      </div>
    </Grid>
  );
};

export default PriceInformations;
