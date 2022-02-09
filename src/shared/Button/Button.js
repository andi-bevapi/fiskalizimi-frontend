import Button from '@mui/material/Button';
import styles from './Button.module.css';
import AddIcon from '@mui/icons-material/Add';
import IconButtonComponent from './IconButton';
// import { useEffect , useState } from "react";
// import { useHoldedOrders } from "../../Context/HoldedOrdersContext";

const ButtonComponent = (props) => {
  // const {totalOrdersNumber} = useHoldedOrders();

  return (
    <div style={{ display: 'flex', margin: '0 3px 3px 0' }}>
      <Button
        variant="contained"
        className={styles.button}
        style={{
          background: `linear-gradient(to right, ${props.darkColor} 35px, ${props.darkColor} 24%, ${props.lightColor} 24%)`,
          padding: '4px',
          paddingRight: '10px',
        }}
        startIcon={<div className={styles.icon}>{props.icon}</div>}
        onClick={props.onClick}
      >
        {props.title}
      </Button>
      {props.addIcon === true ? (
        <IconButtonComponent
          style={{ marginLeft: '-3px', backgroundColor: '#ffaa33', width: '30px' }}
          icon={<AddIcon />}
          iconColor={{ color: 'white' }}
          onClick={props.onClickAdd}
        />
      ) : (
        ''
      )}
      {/* {props.oppenOrder && totalOrdersNumber !== 0 ? (
          <span style={{
              position : "relative",
              top: "-15px",
              left : "-8px",
              backgroundColor: "#f05050",
              color:" #ffffff",
              borderRadius: "50px",
              padding: "5px 12px"
            }}> 
          { totalOrdersNumber }</span>) : ""
      } */}
    </div>
  );
};

export default ButtonComponent;
