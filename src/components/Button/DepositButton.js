import Button from '@mui/material/Button';
import styles from './Button.module.css';

const DepositButtonComponent= (props) => {
  return (
    <div className={styles.fullContainer}>
      <Button
        variant="contained"
        className={styles.depositButton}
        style={{
          background: `${props.lightColor}`,
          margin: 'auto',
          width: 240
        }}
        startIcon={<div className={styles.icon}>{props.icon}</div>}
        onClick={props.onClick}
      >
        {props.title}
      </Button>
    </div>
  );
};

export default DepositButtonComponent;
