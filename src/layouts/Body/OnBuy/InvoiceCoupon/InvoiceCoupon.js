import React, { useEffect, useRef, useState } from 'react';
import { Divider, Button } from '@mui/material';
import styles from './coupon.css';
import ReactToPrint from "react-to-print";
import QRCode from "react-qr-code";
import { printInvoice } from '../../../../services/invoice';

const InvoiceCoupon = (props) => {
    let componentRef = useRef();

    const [value, setValue] = useState("");
    const url = `https://efiskalizimi-app-test.tatime.gov.al/invoice-check/#/verify`;
    const tin = "L91806031N";

    useEffect(() => {
        const date = new Date(props.data.dateTime).toISOString().split(".")[0].concat("+01:00");
        const orderNumber = props.data.invoiceCode.split("/")[0];
        const tmp = url.concat("?iic=", props.data.nslf, "&tin=", tin, "&crtd=", date, "&ord=", orderNumber, "&bu=", 
        props.data.businessUnitCode, "&cr=", props.data.TRCCode, "&sw=", props.data.softCode, "&prc=", props.data.totalAmount);
        setValue(tmp);

    })

    // const handlePrinting = async () => {
    //     console.log("here");
    //     const response = printInvoice({data: document.getElementById("couponToPrint").innerHTML});
    //     console.log(response);
    // }

    return (
        <>
            <div className={styles.headerInvoice}>
                <span className={styles.payTitle}>Fatura Tatimore:</span>
                {/* <ReactToPrint
                    trigger={() => <Button variant="contained" type="submit" className={styles.buttonStyle}> Printo Faturën </Button>}
                    content={() => componentRef}
                /> */}
                <Button variant="contained" onClick={handlePrinting} className={styles.buttonStyle}> Printo Faturën </Button>
            </div>
            <Divider style={{ marginTop: -10, marginBottom: 20 }} />
            <div className={styles.couponDiv} ref={(el) => (componentRef = el)}>
                <div id="couponToPrint" className={styles.couponBG}>
                    <span className={styles.couponBigTitle}>FATURË TATIMORE</span> <br />
                </div>
            </div>
        </>
    );
};

export default InvoiceCoupon;
