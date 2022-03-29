import * as React from 'react';
import { Divider, Button } from '@mui/material';
import styles from './coupon.css';
import temporaryCoupon from '../../../../assets/images/kuponitatimore.png'
const InvoiceCoupon = (props) => {
    const printCoupon = () => {

    }
    return (
        <>
            <div className={styles.headerInvoice}>
                <span className={styles.payTitle}>Fatura Tatimore:</span>
                <Button variant="contained" type="submit" className={styles.buttonStyle} onClick={printCoupon}> Printo Faturën </Button>
            </div>
            <Divider style={{ marginTop: 10, marginBottom: 20 }} />
            <div className={styles.couponDiv}>
                <img src={temporaryCoupon} className={styles.couponImage} />
            </div>
        </>
    );
};

export default InvoiceCoupon;
