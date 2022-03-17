import { Button, Divider, Typography } from "@mui/material";
// import { useBuying } from "../../../../../Context/BuyingContext";
// import { useSettingsContext } from "../../../../../Context/SettingsContext";
import styles from "./CouponPrinting.module.css";
import CouponTopInformation from "./CouponTopInformation";
import FiscalisationData from "./FiscalisationData";
// import { printCoupon } from "../../../../../../ipc-controller/Printing/renderer";
// import { useTranslation } from "react-i18next";
// import { useTransactionsContext } from "../../../../../Context/TransactionsContext";
// import { SwalModal } from "../../../../../UI/Modal/SwalModal";

const CouponPrinting = (props) => {
  let totalPrice = 389;
  let buyingList = [{name: "domate", qty: "2"}];
  // const {
  //   totalPrice,
  //   buyingList,
  // } = useBuying();
  // const {
  //   totalPrice,
  //   buyingList,
  //   paidAmount,
  //   changeAmount,
  //   paymentMethod,
  //   handleDestroyBuyingList,
  // } = useBuying();
  // const { setNewSale } = useTransactionsContext();
  // const { settings } = useSettingsContext();
  // const { t } = useTranslation();
  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  const printingCoupon = (e) => {
    e.preventDefault();
    // const data = {
    //   printer: settings.printer,
    //   products: JSON.stringify(buyingList),
    //   cashier: user.username,
    //   cashierID: user.id,
    //   total: totalPrice + totalPrice * (settings.tvsh /100),
    //   totalWotTVSH: totalPrice,
    //   totalTVSH: totalPrice * (settings.tvsh /100),
    //   paid: paidAmount,
    //   change: changeAmount,
    //   method: paymentMethod
    // }
    // printCoupon(document.getElementById("ticket").innerHTML, data)
    //   .then((response) => {
    //     if (response.statusCode === 200) {
    //       setNewSale("newSale");
    //       handleDestroyBuyingList();
    //       SwalModal(
    //         t(""),
    //         t("successPrinting"),
    //         "success",
    //         "Mbyll",
    //         "",
    //         props.handleClose
    //       );
    //       return;
    //     } else {
    //       SwalModal(
    //         t(""),
    //         t("serverError"),
    //         "error",
    //         "Mbyll",
    //         "",
    //         props.handleClose
    //       );
    //       return;
    //     }
    //   })
    //   .catch((error) => {
    //     alert(error);
    //     return;
    //   });
    props.handleClose();
  };

  return (
    <form onSubmit={printingCoupon} className={styles.mainHolder}>
      <Divider />
      <div
        // className={styles.subMainHolder}
        style={{
          display: "flex",
          flexDirection: "column",
          top: "0",
          left: "0",
          width: "100%",
        }}
        id="ticket"
      >
        <CouponTopInformation />

        {buyingList.map((row, index) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "0",
              marginRight: "0",
              marginTop: "1mm",
              marginBottom: "1mm",
            }}
            key={index}
          >
            <Typography
              align="left"
              variant={"body2"}
              style={{ fontSize: "13px", padding: "0", margin: "0" }}
            >
              {row.name}
            </Typography>
            <div
              style={{
                display: "flex",
                width: "100%",
                marginLeft: "0",
                marginRight: "0",
              }}
            >
              <Typography
                align="left"
                variant={"body2"}
                style={{
                  fontSize: "11px",
                  padding: "0",
                  margin: "0 auto 0  0",
                }}
              >
                {row.qty} cope * {row.price} leke
              </Typography>
              <Typography
                align="right"
                variant={"body2"}
                style={{ fontSize: "11px", padding: "0", margin: "0" }}
              >
                {row.price * row.qty} leke
              </Typography>
            </div>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            borderTop: "1px dashed black",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              marginTop: "1mm",
            }}
          >
            <Typography
              align="left"
              variant={"body2"}
              style={{
                fontSize: "12px",
                padding: "0",
                margin: "0 auto 0  0",
              }}
            >
              Total:
            </Typography>
            <Typography
              align="right"
              variant={"body2"}
              style={{ fontSize: "12px", padding: "0", margin: "0 0 0 0" }}
            >
              {totalPrice} leke
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <Typography
              align="left"
              variant={"body2"}
              style={{
                fontSize: "12px",
                padding: "0",
                fontWeight: "600",
                margin: "0 auto 0  0",
              }}
            >
              Total me TVSH {settings.tvsh}%:
            </Typography>
            <Typography
              align="right"
              variant={"body2"}
              style={{
                fontSize: "13px",
                fontWeight: "600",
                fontStretch: "expanded",
                padding: "0",
                margin: "0 0 0 0",
              }}
            >
              {totalPrice + totalPrice * (settings.tvsh / 100)} leke
            </Typography>
          </div>
        </div>
        <FiscalisationData />
      </div>

      <Divider style={{ padding: "1mm 0" }} />

      <div className={styles.buttonHolder}>
        <Button variant="contained" onClick={printingCoupon} autoFocus>
          {t("printTicket")}
        </Button>
      </div>
    </form>
  );
};
export default CouponPrinting;
