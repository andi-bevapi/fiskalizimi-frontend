import { React, useState } from "react";

import ActionButtons from "./ActionButtons";
import PriceInformations from "./PriceInformations";
import ModalManager from "./ModalManager";

const PriceDescription = () => {
  const [open, setOpen] = useState("");

  const handlePay = () => {
    if (buyingList.length === 0) {
      // SwalModal(t(""), t("buyingListEmpty"), "warning", "Mbyll", "", handleClose);
      alert("Lista e blerjes eshte bosh");
    } else {
      setOpen("pay");
    }
  };

  const handleCouponPrinting = (e) => {
    e.preventDefault();
    setOpen("bill");
  };

  const handleFreezeOrder = (e) => {
    e.preventDefault();
    setOpen("freeze");
  };

  const handleClose = () => {
    setOpen("");
  };
  
  return (
    <div>
      <PriceInformations />
      <ActionButtons handlePay={handlePay} freeze={handleFreezeOrder}/>
      <ModalManager
        modal={open}
        handleClose={handleClose}
        handleCouponPrinting={handleCouponPrinting}
       
      />
    </div>
  );
};

export default PriceDescription;
