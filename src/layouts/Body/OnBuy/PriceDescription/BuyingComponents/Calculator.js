import * as React from "react";
import { Divider, Typography } from "@mui/material";
import styles from "./Calculator.module.css";
import BackspaceIcon from "@mui/icons-material/Backspace";
// import { useTranslation } from "react-i18next";

const Calculator = (props) => {
  // const { t } = useTranslation();
  return (
    <div>
      <form
        onSubmit={props.disabled === false ? props.handleCouponPrinting : (e) => { e.preventDefault() }}
        className={styles.purchaseValueHolder}
      >
        <div className={styles.purchaseValueHolder__title}>
          <Typography>cash ALL:</Typography>
        </div>

        <input
          className={styles.purchaseValueHolder__input}
          type="text"
          id="tentacles"
          name="tentacles"
          min="0.00"
          maxLength="12"
          placeholder="0.00"
          value={props.payment}
          onChange={props.handleInput}
          autoFocus
        />
      </form>
      <Divider
        style={{
          width: "100%",
          margin: "20px 0px",
        }}
      />
      <div className={styles.mainHolder}>
        <div className={styles.calculatorHolder}>
          <div className={styles.rowHolder}>
            <button value="1" onClick={props.handleManualClick}>
              1
            </button>
            <button value="2" onClick={props.handleManualClick}>
              2
            </button>
            <button value="3" onClick={props.handleManualClick}>
              3
            </button>
          </div>
          <div className={styles.rowHolder}>
            <button value="4" onClick={props.handleManualClick}>
              4
            </button>
            <button value="5" onClick={props.handleManualClick}>
              5
            </button>
            <button value="6" onClick={props.handleManualClick}>
              6
            </button>
          </div>
          <div className={styles.rowHolder}>
            <button value="7" onClick={props.handleManualClick}>
              7
            </button>
            <button value="8" onClick={props.handleManualClick}>
              8
            </button>
            <button value="9" onClick={props.handleManualClick}>
              9
            </button>
          </div>
          <div className={styles.rowHolder}>
            <button value="x" onClick={props.handleManualClickDelete}>
              <BackspaceIcon />
            </button>
            <button value="0" onClick={props.handleManualClick}>
              0
            </button>
            <button value="." onClick={props.handleManualClick}>
              .
            </button>
          </div>
        </div>
        <div className={styles.acHolder}>
          <button
            onClick={props.handleACDeleteButton}
          >AC</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
