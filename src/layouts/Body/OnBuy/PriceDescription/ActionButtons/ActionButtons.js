import { Divider } from "@mui/material";
import ButtonComponent from "../../../../../shared/Button/Button";
// import styles from "../PriceDescription.module.css";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import IconButtonComponent from "../../../../../shared//Button/IconButton";
import BlockIcon from "@mui/icons-material/Block";
import PanToolIcon from "@mui/icons-material/PanTool";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
// import { useBuying } from "../../../../../Context/BuyingContext";
// import { useTranslation } from "react-i18next";

const ActionButtons = (props) => {
  // const { handleDestroyBuyingList } = useBuying();
  // const { t } = useTranslation();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          width: "1050%",
        }}
      >
        <Divider />
      </div>
      <div
        style={{
          display: "flex",
          marginRight: "0%",
          marginLeft: "auto",
        }}
      >
        <IconButtonComponent
          style={{
            backgroundColor: "rgb(38, 179, 201)",
            marginRight: "10px",
          }}
          icon={<LocalPrintshopIcon />}
          // onClick={props.handleSettings}
          iconColor={{ color: "white" }}
        />
        <ButtonComponent
          title="cancel"
          lightColor="rgb(240, 80, 80)"
          darkColor="rgb(220, 80, 80)"
          addIcon={false}
          // onClick={handleDestroyBuyingList}
          // onClickAdd={props.handleAddProduct}
          icon={<BlockIcon />}
        />
        <ButtonComponent
          title="hold"
          lightColor="#5fbeaa"
          darkColor="#51a794"
          addIcon={false}
          onClick={props.freeze}
          icon={<PanToolIcon />}
        />

        <ButtonComponent
          title="pay"
          lightColor="rgba(129, 200, 104, 0.8)"
          darkColor="rgba(129, 200, 104, 1)"
          addIcon={false}
          // onClick={props.handlePay}
          icon={<LocalAtmIcon />}
        />
      </div>
    </div>
  );
};

export default ActionButtons;
