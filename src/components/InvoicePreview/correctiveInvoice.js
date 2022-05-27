import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { useConfigProvider } from "../../Context/ConfigurationsContext";
import styles from './styles.css';

const CorrectiveInvoicePreview = React.forwardRef((props, ref) => {
    const [value, setValue] = useState("");
    const url = `https://efiskalizimi-app-test.tatime.gov.al/invoice-check/#/verify`;
    const tin = "L91806031N";
    const { config } = useConfigProvider();

    useEffect(() => {
        const date = new Date(props.data.dateTime).toISOString().split(".")[0].concat("+01:00");
        const orderNumber = props.data.invoiceCode.split("/")[0];
        const tmp = url.concat("?iic=", props.data.NSLF, "&tin=", tin, "&crtd=", date, "&ord=", orderNumber, "&bu=",
            props.data.branch.businessUnitCode, "&cr=", props.data.client.TCRCode, "&sw=", props.data.client.softCode, "&prc=", props.data.totalAmount);
        setValue(tmp);
    });

    return (
        <Grid container xs={8} md={8}>
            <div className={styles.couponDiv} >
                <div id="couponToPrint" className={styles.couponBG} ref={ref}>
                    <span className={styles.couponBigTitle}>FATURË KORRIGJUESE</span> <br />
                    <span className={styles.couponText}>Nr.fature: {props.data.invoiceCode}</span>
                    <br />
                    <span className={styles.couponBusinessName}>{props.data.clientName}</span><br />
                    <span className={styles.couponText}>{props.data.clientNUIS}</span><br />
                    <span className={styles.couponText}>{props.data.clientAddress}</span>
                    <br />
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
                            <th className={styles.couponText}>Artikulli</th>
                            <th className={styles.productPriceRow}></th>
                            <th className={styles.productPriceRow}></th>
                            <th className={styles.productPriceRow}></th>
                            <th className={styles.productPriceRow}>Totali</th>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #dbdbdb' }}>
                            <th className={styles.couponTitleText}>Sasia</th>
                            <th className={styles.couponTitleText}>Çmimi</th>
                            <th className={styles.couponTitleText}></th>
                            <th className={styles.couponTitleText} style={{ textAlign: 'end' }}>Vl paTvsh</th>
                            <th className={styles.couponTitleText}></th>
                        </tr>
                        {props.data?.items?.map((item) => {
                            return (
                                <>
                                    <tr style={{ textAlign: "left" }}>
                                        <td className={styles.productDataRow} style={{ textTransform: 'uppercase' }}>{item.product.name}</td>
                                        <td className={styles.productDataRow}></td>
                                        <td className={styles.productDataRow}></td>
                                        <td className={styles.productDataRownoVAT}></td>
                                        <td className={styles.productPriceRow}>{Number(item.finalPrice * item.quantity).toFixed(2)}</td>
                                    </tr>
                                    <tr style={{ textAlign: "left", borderBottom: '1px solid #dbdbdb' }}>
                                        <td className={styles.productDataRow}>{item.quantity}</td>
                                        <td className={styles.productDataRow}>{item.finalPrice.toFixed(2)}</td>
                                        <td className={styles.productDataRow}></td>
                                        <td className={styles.productDataRownoVAT}>{(item.originalPrice.toFixed(2) * item.quantity).toFixed(2)}</td>
                                        <td className={styles.productPriceRow}></td>
                                    </tr>
                                </>
                            )
                        })}
                    </table>
                    <hr />
                    <div className={styles.couponAmounts}>
                        <span>Vlera</span> <span className={styles.rightText}>{props.data.totalAmountNoVAT.toFixed(2)}</span><br />
                        <span>Total TVSH 6%</span> <span className={styles.rightText}>{props.data.totalVat6.toFixed(2)}</span><br />
                        <span>Total TVSH 20%</span> <span className={styles.rightText}>{props.data.totalVat20}</span><br />
                        <span><b>Total meTVSH</b></span> <span className={styles.rightText}><b>{props.data.totalAmount}</b></span><br />
                    </div>
                    <br />
                    <div style={{ background: 'white', padding: '16px' }}>
                        <QRCode value={value} size={120} />
                    </div>
                    <span className={styles.nslfText}>NIVF: {props.data.FIC}</span> <br />
                    <span className={styles.nslfText}>NSLF: {props.data.NSLF}</span>
                    <br /><br />
                    <span className={styles.couponTitleText}>{config?.billMessage}</span> <br />
                    <span className={styles.couponTitleText}>Gjeneruar nga Ovla Systems</span> <br />
                    <span className={styles.couponTitleText}><b>posla.al</b></span>
                </div>
            </div>
        </Grid>
    );
});

export default CorrectiveInvoicePreview;