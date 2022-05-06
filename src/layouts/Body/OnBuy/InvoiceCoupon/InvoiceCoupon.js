import { Button, Divider, Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactToPrint from "react-to-print";
import InvoicePreview from '../../../../components/InvoicePreview';
import { useConfigProvider } from "../../../../Context/ConfigurationsContext";
import styles from './coupon.css';

const InvoiceCoupon = (props) => {
    const { t }  = useTranslation();
    let componentRef = useRef();

    const [value, setValue] = useState("");
    const url = `https://efiskalizimi-app-test.tatime.gov.al/invoice-check/#/verify`;
    const tin = "L91806031N";
    const { config } = useConfigProvider();

    useEffect(() => {
        const date = new Date(props.data.dateTime).toISOString().split(".")[0].concat("+01:00");
        const orderNumber = props.data.invoiceCode.split("/")[0];
        const tmp = url.concat("?iic=", props.data.nslf, "&tin=", tin, "&crtd=", date, "&ord=", orderNumber, "&bu=",
            props.data.businessUnitCode, "&cr=", props.data.TRCCode, "&sw=", props.data.softCode, "&prc=", props.data.totalAmount);
        setValue(tmp);

    });

    return (
        <>
            <div className={styles.headerInvoice}>
                <Grid item xs={6} md={6}>
                    <span className={styles.payTitle}>{t("taxBill")}</span>
                </Grid>
                <Grid item xs={4} md={2}>
                    <ReactToPrint
                        trigger={() => <Button variant="contained" type="submit" className={styles.buttonStyle}> {t("printBill")} </Button>}
                        content={() => componentRef}
                    />
                </Grid>
            </div>
            <Divider style={{ marginTop: 10, marginBottom: 20 }} />

            <InvoicePreview data={props.data} componentRef={componentRef} />
        </>
    );
};

export default InvoiceCoupon;
