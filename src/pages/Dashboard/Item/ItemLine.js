import { Typography, Divider } from "@mui/material/";
// import { useBuying } from "../../../../Context/BuyingContext";
import styles from "./ItemLine.module.css";
// import { useTranslation } from "react-i18next";

const ItemLine = (props) => {
  // const { addToBuyingList } = useBuying();
  // const { t } = useTranslation();

  return (
    <div
      // onClick={() => addToBuyingList(props.item)}
      className={styles.container}
    >
      <Divider
        style={{
          marginBottom: "10px",
        }}
      />
      <div style={{ display: "flex" }}>
        <Typography variant="body2" color="text.secondary">
          {props.item.name}
        </Typography>
        <Typography
          variant="body2"
          color="rgb(129, 200, 104)"
          style={{
            fontWeight: "bold!important",
            marginLeft: "auto",
            marginRight: "0%",
          }}
        >
          {props.item.price} ALL
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{
            fontWeight: "bold!important",
            marginLeft: "15%",
            marginRight: "1%",
            width: "120px"
          }}
        >
          "stock": {props.item.stock}
        </Typography>
      </div>
    </div>
  );
};

export default ItemLine;
