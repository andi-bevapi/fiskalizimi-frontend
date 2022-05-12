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
        <span className={styles.couponBusinessName}>{props.data.clientName}</span>
        <br />
        <p className={styles.couponText}>{props.data.clientAddress}</p>
        <div className={styles.leftText}>
          <p className={styles.couponText}>
            Nr. Fature: <b>{props.data.invoiceCode}</b>
          </p>
          <p className={styles.couponText} style={{marginTop: "-15px"}}>
            Data dhe ora: <b>{props.data.dateTime}</b>
          </p>
          <p className={styles.couponText} style={{marginTop: "-15px"}}>
            NUIS: <b>{props.data.clientNUIS}</b>
          </p>
          <p className={styles.couponText} style={{marginTop: "-15px"}}>
            Kodi i Biznesit: <b style={{textTransform: 'lowercase'}}>{props.data.branchCode}</b>
          </p>
          <p className={styles.couponText} style={{marginTop: "-15px"}}>
            Kodi i Operatorit: <b style={{textTransform: 'lowercase'}}>{props.data.operatorCode}</b>
          </p>
          <p className={styles.couponText} style={{marginTop: "-15px"}}>
            Mënyra e pagesës: <b>{props.data.paymentMethod}</b>
          </p>
        </div>
        <span className={styles.couponTitleCapital}>ARTIKUJT</span> <br />
        <table>
          <tr>
            <th className={styles.couponText}>Artikulli</th>
            <th className={styles.productPriceRow}></th>
            <th className={styles.productPriceRow}></th>
            <th className={styles.productPriceRow}></th>
            <th className={styles.productPriceRow}>Vl meTVSH</th>
          </tr>
          <tr style={{borderBottom: '1px solid #dbdbdb' }}>
            <th className={styles.couponTitleText}>Sasia</th>
            <th className={styles.couponTitleText}>Çmimi</th>
            <th className={styles.couponTitleText}></th>
            <th className={styles.couponTitleText} style={{textAlign: 'end'}}>Vl paTvsh</th>
            <th className={styles.couponTitleText}></th>
         </tr>
          {props.data.productList?.map((item, index) => {
            return (
              <>
                 <tr style={{ textAlign: "left"}}>
                    <td className={styles.productDataRow} style={{textTransform: 'uppercase'}}>{item.productName}</td>
                    <td className={styles.productDataRow}></td>
                    <td className={styles.productDataRow}></td>
                    <td className={styles.productDataRownoVAT}></td>
                    <td className={styles.productPriceRow}>{Number(item.finalPrice * item.quantity).toFixed(2)}</td>
                </tr>
                <tr style={{ textAlign: "left" }}>
                  <td className={styles.productDataRow}>{item.quantity}</td>
                  <td className={styles.productDataRow}>{item.finalPrice.toFixed(2)}</td>
                  <td className={styles.productDataRow}></td>
                  <td className={styles.productDataRownoVAT}>{(item.originalPrice.toFixed(2) * item.quantity).toFixed(2)}</td>
                  <td className={styles.productPriceRow}></td>
                </tr>
              </>
            );
          })}
        </table>
        <hr />
        <hr />
        <div className={styles.couponAmounts} style={{marginTop: "-10px"}}>
          <span className={styles.couponText}>Total paTVSH</span> <span className={styles.rightText}>{props.data.totalAmountNoVAT}</span>
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
        <div style={{ background: 'white', padding: '14px', paddingBottom: '6px' }}>
          <QRCode value={value} size={110} />
        </div>
        <p className={styles.nslfText}>NIVF: {props.data.nivf}</p>
        <p className={styles.nslfText} style={{marginTop: "-10px"}}>NSLF: {props.data.nslf}</p>
        <p className={styles.couponText}>{config?.billMessage}</p>
        <div className={styles.leftText}>
        <span className={styles.couponText}>Gjeneruar nga Ovla Systems</span>
        <span className={styles.couponText} style={{ float: 'right'}}>
          <b>posla.al</b>
        </span>
        </div>
      </div>
    </div>
  );
});

export default InvoiceToPrint;
