import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useConfigProvider } from '../../../../Context/ConfigurationsContext';
import { useTranslation } from 'react-i18next';
import styles from './coupon.css';

const InvoiceToPrint = React.forwardRef((props, ref) => {
  const { t } = useTranslation();

  const [value, setValue] = useState('');
  const url = `https://efiskalizimi-app-test.tatime.gov.al/invoice-check/#/verify`;
  const tin = 'L91806031N';
  const { config } = useConfigProvider();

  useEffect(() => {
    const date = new Date(props.data.dateTime).toISOString().split('.')[0].concat('+01:00');
    const orderNumber = props.data.invoiceCode.split('/')[0];
    const tmp = url.concat(
      '?iic=',
      props.data.nslf,
      '&tin=',
      tin,
      '&crtd=',
      date,
      '&ord=',
      orderNumber,
      '&bu=',
      props.data.businessUnitCode,
      '&cr=',
      props.data.TRCCode,
      '&sw=',
      props.data.softCode,
      '&prc=',
      props.data.totalAmount,
    );
    setValue(tmp);
  });

  return (
    <div style={{ display: 'none' }}>
      <div id="couponToPrint" className={styles.couponBG} ref={ref}>
        <p className={styles.couponBigTitle}>FATURË TATIMORE</p>
        <p className={styles.couponText} style={{marginTop: "-20px"}}>Kodi: {props.data.invoiceCode}</p>
        <span className={styles.couponBusinessName}>{props.data.clientName}</span>
        <br />
        <p className={styles.couponText}>NUIS: {props.data.clientNUIS}</p>
        <p className={styles.couponText} style={{marginTop: "-15px"}}>{props.data.clientAddress}</p>
        <div className={styles.leftText}>
          <p className={styles.couponText}>
            Data dhe ora: {props.data.dateTime}
            <b></b>
          </p>
          <p className={styles.couponText} style={{marginTop: "-17px"}}>
            Kodi i Biznesit: <b>{props.data.branchCode}</b>
          </p>
          <p className={styles.couponText} style={{marginTop: "-17px"}}>
            Kodi i Operatorit: <b>{props.data.operatorCode}</b>
          </p>
          <p className={styles.couponText} style={{marginTop: "-17px"}}>
            Mënyra e pagesës: <b>{props.data.paymentMethod}</b>
          </p>
        </div>
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
                <tr style={{ textAlign: 'left', marginBottom: "-5px" }}>
                  <td className={styles.productDataRow}>{index + 1}</td>
                  <td className={styles.productDataRow}>{item.productName}</td>
                  <td className={styles.productDataRow}>{item.quantity}</td>
                  <td className={styles.productDataRow}>{item.finalPrice.toFixed(2)}</td>
                  <td className={styles.productPriceRow}>
                    {Number(item.finalPrice * item.quantity).toFixed(2)}
                  </td>
                </tr>
              </>
            );
          })}
        </table>
        <hr />
        <hr />
        <div className={styles.couponAmounts} style={{marginTop: "-10px"}}>
          <span className={styles.couponText}>Vlera</span> <span className={styles.rightText}>{props.data.totalAmountNoVAT}</span>
          <br />
          <span className={styles.couponText}>Total TVSH 6%</span>{' '}
          <span className={styles.rightText}>{props.data.totalVat6}</span>
          <br />
          <span className={styles.couponText}>Total TVSH 20%</span>{' '}
          <span className={styles.rightText}>{props.data.totalVat20}</span>
          <br />
          <span>
            <b>Total meTVSH</b>
          </span>{' '}
          <span className={styles.rightText}>
            <b>{props.data.totalAmount}</b>
          </span>
          <br />
        </div>
        <div style={{ background: 'white', padding: '16px' }}>
          <QRCode value={value} size={150} />
        </div>
        <p className={styles.nslfText}>NIVF: {props.data.nivf}</p>
        <p className={styles.nslfText} style={{marginTop: "-10px"}}>NSLF: {props.data.nslf}</p>
        <p className={styles.couponText}>{config?.billMessage}</p>
        <span className={styles.couponText}>Gjeneruar nga Ovla Systems</span> <br />
        <span className={styles.couponText}>
          <b>posla.al</b>
        </span>
      </div>
    </div>
  );
});

export default InvoiceToPrint;
