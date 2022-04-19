import React, { useEffect, useRef, useState } from 'react';
import { Divider, Button, Grid } from '@mui/material';
import styles from './coupon.css';
import ReactToPrint from "react-to-print";
import QRCode from "react-qr-code";
import { useConfigProvider } from "../../../../Context/ConfigurationsContext";
import { display, grid } from '@mui/system';
import { useTranslation } from 'react-i18next';

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


            <Grid container xs={8} md={8}>
                <div className={styles.couponDiv} >
                    <div id="couponToPrint" className={styles.couponBG} ref={(el) => (componentRef = el)}>
                        <span className={styles.couponBigTitle}>FATURË TATIMORE</span> <br />
                        <span className={styles.couponText}>Kodi: {props.data.invoiceCode}</span>
                        <br /><br /><br />
                        <span className={styles.couponBusinessName}>{props.data.clientName}</span><br />
                        <span className={styles.couponText}>{props.data.clientNUIS}</span><br />
                        <span className={styles.couponText}>{props.data.clientAddress}</span>
                        <br /><br /><br />
                        <div className={styles.leftText}>
                            <span className={styles.couponText}>Data dhe ora: {props.data.dateTime}<b></b></span><br />
                            <span className={styles.couponText}>Kodi i Biznesit: <b>{props.data.branchCode}</b></span><br />
                            <span className={styles.couponText}>Kodi i Operatorit: <b>{props.data.operatorCode}</b></span><br />
                            <span className={styles.couponText}>Mënyra e pagesës: <b>{props.data.paymentMethod}</b></span><br />
                        </div>
                        <br />
                        <span className={styles.couponTitleCapital}>ARTIKUJT</span> <br />
                        <table>
                            <tr>
                                <th className={styles.couponText}>Nr.</th>
                                <th className={styles.couponText}>Artikulli</th>
                                <th className={styles.couponText}>Sasia</th>
                                <th className={styles.couponText}>Çmimi</th>
                                <th className={styles.productPriceRow}>Totali</th>
                            </tr>
                            {props.data.productList?.map((item, index) => {
                                return (
                                    <>
                                        <tr style={{ textAlign: "left" }}>
                                            <td className={styles.productDataRow}>{index + 1}</td>
                                            <td className={styles.productDataRow}>{item.productName}</td>
                                            <td className={styles.productDataRow}>{item.quantity}</td>
                                            <td className={styles.productDataRow}>{item.finalPrice.toFixed(2)}</td>
                                            <td className={styles.productPriceRow}>{Number(item.finalPrice * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    </>
                                )
                            })}
                        </table>
                        <hr /><hr />
                        <div className={styles.couponAmounts}>
                            <span>Vlera</span> <span className={styles.rightText}>{props.data.totalAmountNoVAT}</span><br />
                            <span>Total TVSH 6%</span> <span className={styles.rightText}>{props.data.totalVat6}</span><br />
                            <span>Total TVSH 20%</span> <span className={styles.rightText}>{props.data.totalVat20}</span><br />
                            <span><b>Total meTVSH</b></span> <span className={styles.rightText}><b>{props.data.totalAmount}</b></span><br />
                        </div>
                        <br />
                        <div style={{ background: 'white', padding: '16px' }}>
                            <QRCode value={value} size={150} />
                        </div>
                        <br />
                        <span className={styles.nslfText}>NIVF: {props.data.nivf}</span> <br />
                        <span className={styles.nslfText}>NSLF: {props.data.nslf}</span>
                        <br /><br /><br />
                        <span className={styles.couponText}>{config?.billMessage}</span> <br /><br />
                        <span className={styles.couponText}>Gjeneruar nga Ovla Systems</span> <br />
                        <span className={styles.couponText}><b>posla.al</b></span>
                    </div>
                </div>
            </Grid>

        </>
    );
};

export default InvoiceCoupon;
