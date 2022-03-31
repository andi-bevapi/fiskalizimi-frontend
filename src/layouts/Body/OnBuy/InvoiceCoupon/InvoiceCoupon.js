import React, { useRef } from 'react';
import { Divider, Button } from '@mui/material';
import styles from './coupon.css';
import qrcode from '../../../../assets/images/qrcodexample.png'
import ReactToPrint from "react-to-print";

const InvoiceCoupon = (props) => {
    let componentRef = useRef();

    return (
        <>
            <div className={styles.headerInvoice}>
                <span className={styles.payTitle}>Fatura Tatimore:</span>
                <ReactToPrint
                    trigger={() => <Button variant="contained" type="submit" className={styles.buttonStyle}> Printo Faturën </Button>}
                    content={() => componentRef}
                />
            </div>
            <Divider style={{ marginTop: 10, marginBottom: 20 }} />
            <div className={styles.couponDiv} ref={(el) => (componentRef = el)}>
                <div id="couponToPrint" className={styles.couponBG}>
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
                        <span className={styles.couponText}>Menyra e pageses: <b>{props.data.paymentMethod}</b></span><br />
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
                    <img src={qrcode} className={styles.qrCode} />
                    <br />
                    <span className={styles.couponText}>NIVF: {props.data.nivf}</span> <br />
                    <span className={styles.couponText}>NSLF: {props.data.nslf}</span>
                    <br /><br /><br />
                    <span className={styles.couponText}>{props.data.message}</span> <br /><br />
                    <span className={styles.couponText}>Ovla Systems</span> <br />
                    <span className={styles.couponText}><b>posla.al</b></span>
                </div>
            </div>
        </>
    );
};

export default InvoiceCoupon;
