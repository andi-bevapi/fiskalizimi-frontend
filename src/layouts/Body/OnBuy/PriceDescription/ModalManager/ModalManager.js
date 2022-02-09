import ModalComponent from "../../../../../shared/Modal/Modal";
import BuyingComponent from "../BuyingComponents/BuyingComponent";
import CouponPrinting from "../CouponPrinting/CouponPrinting";
// import { useTranslation } from "react-i18next";
// import FreezeOrder from "../../../FreezeOrder/FreezeOrder";

const ModalManager = (props) => {
  // const { t } = useTranslation();
  return (
    <>
      <ModalComponent
        open={props.modal === "pay"}
        handleClose={props.handleClose}
        title="confirmBuy"
      >
        <BuyingComponent handleCouponPrinting={props.handleCouponPrinting} />
      </ModalComponent>
      <ModalComponent
        open={props.modal === "bill"}
        handleClose={props.handleClose}
        title="printTicket"
      >
        <CouponPrinting handleClose={props.handleClose} />
      </ModalComponent>
      {/* <ModalComponent open={props.modal ==="freeze"}
       handleClose={props.handleClose}
       title="holdTicket">
         <FreezeOrder/>
      </ModalComponent> */}
    </>
  );
};

export default ModalManager;
