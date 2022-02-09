import { Button, Divider, Typography } from "@mui/material";
import styles from "./BuyingComponent.module.css";
// import { useBuying } from "../../../../../Context/BuyingContext";
// import { useSettingsContext } from "../../../../../Context/SettingsContext";
import Calculator from "./Calculator";
import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";

const BuyingComponent = (props) => {
  // const { totalPrice, setPaymentMethod, setChangeAmount, setPaidAmount } =
  //   useBuying();
  // const { settings } = useSettingsContext();

  // const { t } = useTranslation();
  const [payment, setPayment] = useState("");

  useEffect(() => {
    // if (payment - (totalPrice + totalPrice * (settings.tvsh / 100)) >= 0)
    //   setChangeAmount(
    //     (payment - (totalPrice + totalPrice * (settings.tvsh / 100))).toFixed(2)
    //   );
    // setPaidAmount(payment);
  });

  const handleManualClickDelete = (event) => {
    event.preventDefault();
    setPayment(payment.substring(0, payment.length - 1));
  };

  const handleACDeleteButton = (event) => {
    event.preventDefault();
    setPayment("");
  };

  const handleManualClick = (event) => {
    event.preventDefault();
    setPayment(payment + event.target.value);
  };

  const handleInput = (event) => {
    event.preventDefault();
    var regex = /^[a-zA-Z+*-/~`'"|]+$/;
    if (event.target.value.match(regex)) {
      return;
    }
    setPayment(event.target.value);
  };

  return (
    <div className={styles.mainHolder}>
      <Divider />

      <div className={styles.subMainHolder}>
        <div className={styles.cashOrCard}>
          <Button >{t("cash")}</Button>
          <Button >
            {t("creditcard")}
          </Button>
        </div>
        <div className={styles.purchaseInfo}>
          <div className={styles.totalPriceHolder}>
            <Typography>{t("totalPrice")}</Typography>
            <div className={styles.totalPriceSubHolder}>
              <Typography>
                {" "}
                total price me tvsh
                {/* {totalPrice + totalPrice * (settings.tvsh / 100)}{" "} */}
              </Typography>
            </div>
          </div>

          <Calculator
            // disabled={
            //   payment - (totalPrice + totalPrice * (settings.tvsh / 100)) < 0
            //     ? true
            //     : false
            // }
            handleCouponPrinting={props.handleCouponPrinting}
            handleManualClickDelete={handleManualClickDelete}
            handleInput={handleInput}
            handleACDeleteButton={handleACDeleteButton}
            handleManualClick={handleManualClick}
            payment={payment}
          />
        </div>
      </div>
      <Divider />

      <div className={styles.buttonHolder}>
        <Button
          variant="contained"
          style={{
            width: "45%",
          }}
        >
          change ALL{" "}
          total price
          {/* {(
            payment -
            (totalPrice + totalPrice * (settings.tvsh / 100))
          ).toFixed(2)} */}
        </Button>
        {/* {payment - (totalPrice + totalPrice * (settings.tvsh / 100)) < 0 ? (
          ""
        ) : ( */}
          <Button
            variant="contained"
            style={{
              width: "40%",
              backgroundColor: "#81c868",
            }}
            onClick={props.handleCouponPrinting}
          >
            {t("generateTicket")}
          </Button>
        {/* )} */}
      </div>
    </div>
  );
};

export default BuyingComponent;
