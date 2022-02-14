import IconButtonComponent from "../../../../shared/Button/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./ItemQuantity.module.css";
// import { useBuying } from "../../../../Context/BuyingContext";

const ItemQuantity = (props) => {
  // const { handleDecrement, handleIncrement, handleManualInput } = useBuying();

  return (
    <div className={styles.container}>
      <IconButtonComponent
        style={{ backgroundColor: "rgb(95, 190, 170)", fontSize: "6px" }}
        icon={<RemoveIcon fontSize={"small"} />}
        iconColor={{ color: "white" }}
        className={styles.buttonArea}
        // onClick={() => handleDecrement(props.element.id)}
      />

      <input
        type="number"
        id="tentacles"
        name="tentacles"
        min="1"
        step=".01"
        pattern="^\d*(\.\d{0,2})?$"
        value={props.element.qty === 0 ? "" : props.element.qty}
        className={styles.inputArea}
        // onChange={(e) => {
        //   e.preventDefault();
        //   handleManualInput(e.target.value, props.element.id);
        // }}
      />
      <IconButtonComponent
        style={{ backgroundColor: "rgb(95, 190, 170)" }}
        icon={<AddIcon fontSize={"small"} />}
        iconColor={{ color: "white" }}
        className={styles.buttonArea}
        // onClick={() => handleIncrement(props.element.id)}
      />
    </div>
  );
};

export default ItemQuantity;
