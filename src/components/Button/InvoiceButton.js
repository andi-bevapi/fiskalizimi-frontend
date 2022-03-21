import Button from '@mui/material/Button';
import styles from './Button.module.css';
import AddIcon from '@mui/icons-material/Add';
import IconButtonComponent from './IconButton';
import { makeStyles } from '@mui/styles';
// import { useEffect , useState } from "react";
// import { useHoldedOrders } from "../../Context/HoldedOrdersContext";
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    marginLeft: '3px',
  },
  iconBtn: {
    marginLeft: '-3px',
    backgroundColor: '#ffaa33',
    width: '30px',
  },
}));

const ButtonComponent = (props) => {
  const classes = useStyles();
  // const {totalOrdersNumber} = useHoldedOrders();

  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        className={styles.button}
        style={{
          background: `${props.lightColor}`,
          padding: '5px 30px 7px 30px',
          margin: '0 3px',
          fontWeight: 600,
        }}
        startIcon={<div className={styles.icon}>{props.icon}</div>}
        onClick={props.onClick}
      >
        {props.title}
      </Button>
      {props.addIcon && (
        <IconButtonComponent
          className={classes.iconBtn}
          icon={<AddIcon />}
          iconColor={{ color: 'white' }}
          onClick={props.onClickAdd}
        />
      )}
    </div>
  );
};

export default ButtonComponent;
