import { React, useState } from "react";

import ActionButtons from "./ActionButtons";
import PriceInformations from "./PriceInformations";
import ModalManager from "./ModalManager";
import { useTranslation } from 'react-i18next';

const PriceDescription = (props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState("");

  const handlePay = () => {
    if (buyingList.length === 0) {
      // SwalModal(t(""), t("buyingListEmpty"), "warning", "Mbyll", "", handleClose);
      alert(t("activeInvoiceEmpty"));
    } else {
      setOpen("pay");
    }
  };

  const handleCouponPrinting = (e) => {
    e.preventDefault();
    setOpen("bill");
  };

  const handleClose = () => {
    setOpen("");
  };
  
  return (
    <div>
      <PriceInformations invoiceList={props.invoiceList}/>
      <ActionButtons handlePay={handlePay} />
      <ModalManager
        modal={open}
        handleClose={handleClose}
        handleCouponPrinting={handleCouponPrinting}
       
      />
    </div>
  );
};

export default PriceDescription;
