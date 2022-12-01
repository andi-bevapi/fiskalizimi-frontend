import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useConfigProvider } from '../../../../Context/ConfigurationsContext';
import { useTranslation } from 'react-i18next';
import styles from './coupon.css';
import DocumentTitle from 'react-document-title';
import pageTitle from "../../../../helpers/pageTitle";

const LargePrint = React.forwardRef((props, ref) => {
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
        <div id="couponToPrint" className={styles.largeCouponBG} ref={ref}>
        <br/>
        <p className={styles.largecouponBigTitle}>FATURË TATIMORE</p>
        <span className={styles.couponBusinessName}>{props.data.clientName}</span>
        <br />
        <p className={styles.largecouponText}>{props.data.clientAddress}</p>
        <div className={styles.leftText}>
          <p className={styles.largecouponText}>
           {t("billNumber")} <b>{props.data.invoiceCode}</b>
          </p>
          <p className={styles.largecouponText} style={{marginTop: "-15px"}}>
              {t("dateTime")} <b>{props.data.dateTime}</b>
          </p>
          <p className={styles.largecouponText} style={{marginTop: "-15px"}}>
          {t("billNumber")}  <b>{props.data.clientNUIS}</b>
          </p>
          <p className={styles.largecouponText} style={{marginTop: "-15px"}}>
            {t("businessCode")} <b style={{textTransform: 'lowercase'}}>{props.data.branchCode}</b>
          </p>
          <p className={styles.largecouponText} style={{marginTop: "-15px"}}>
            {t("operatorCode")} <b style={{textTransform: 'lowercase'}}>{props.data.operatorCode}</b>
          </p>
          <p className={styles.largecouponText} style={{marginTop: "-15px"}}>
              {t("chooseWayOfPayment")} <b>{props.data.paymentMethod}</b>
          </p>
        </div>
        <span className={styles.couponTitleCapital}>{t("arcticles")}</span> <br />
        <table>
          <tr style={{borderBottom: '1px solid #dbdbdb' }}>
            <th className={styles.largecouponText}>{t("arcticle")}</th>
            <th className={styles.largeproductPriceRow}>{t("quantity")}</th>
            <th className={styles.largeproductPriceRow}>{t("Price")}</th>
            <th className={styles.productPriceRow}>{t("priceWithoutVat")}</th>
            <th className={styles.productPriceRow}>{t("priceWithVat")}</th>
          </tr>
          {/* <tr style={{borderBottom: '1px solid #dbdbdb' }}>
            <th className={styles.couponTitleText}></th>
            <th className={styles.couponTitleText}></th>
            <th className={styles.couponTitleText}></th>
            <th className={styles.couponTitleText} style={{textAlign: 'end'}}></th>
            <th className={styles.couponTitleText}></th>
         </tr> */}
          {props.data.productList?.map((item, index) => {
            return (
              <>
                 <tr>
                    <td className={styles.largeproductDataRow} style={{textTransform: 'uppercase'}}>{item.productName}</td>
                    <td className={styles.largeproductDataRow}>{item.quantity}</td>
                    <td className={styles.largeproductDataRow}>{item.finalPrice.toFixed(2)}</td>
                    <td className={styles.largeproductDataRownoVAT}>{(item.originalPrice.toFixed(2) * item.quantity).toFixed(2)}</td>
                    <td className={styles.productPriceRow}>{Number(item.finalPrice * item.quantity).toFixed(2)}</td>
                </tr>
                {/* <tr style={{ textAlign: "left" }}>
                  <td className={styles.largeproductDataRow}></td>
                  <td className={styles.largeproductDataRow}></td>
                  <td className={styles.largeproductDataRow}></td>
                  <td className={styles.largeproductDataRownoVAT}></td>
                  <td className={styles.productPriceRow}></td>
                </tr> */}
              </>
            );
          })}
        </table>
        <hr />
        <hr />
        <br/>
        <div className={styles.couponAmounts} style={{marginTop: "-10px"}}>
          <span className={styles.largecouponText}>{t("total_amount_no_vat")}</span> <span className={styles.largerightText}>{props.data.totalAmountNoVAT}</span>
          <br />
          <span className={styles.largecouponText}>{t("totalVat6")}</span>
          <span className={styles.largerightText}>{props.data.totalVat6}</span>
          <br />
          <span className={styles.largecouponText}>{t("totalVat20")}</span>
          <span className={styles.largerightText}>{props.data.totalVat20}</span>
          <br />
          <span className={styles.largecouponText}>
            <b>{t("totalVat")}</b>
          </span>
          <span className={styles.largerightText}>
            <b>{props.data.totalAmount}</b>
          </span>
          <br />
        </div>
        <div style={{ background: 'white', padding: '14px', paddingBottom: '6px' }}>
          <QRCode value={value} size={130} />
        </div>
        <br/>
        <p className={styles.largenslfText}><b>NIVF: {props.data.nivf}</b></p>
        <p className={styles.largenslfText} style={{marginTop: "-10px"}}><b>NSLF: {props.data.nslf}</b></p><br/>
        <p className={styles.largecouponText}>{config?.billMessage}</p>
        <div className={styles.leftText}>
        <p className={styles.centerTextOvla}>
          <span className={styles.largecouponText}>{t("generatedByOvla")}</span> <br/>
          <span className={styles.largecouponText}>
            <b>posla.al</b>
          </span><br/><br/>
          <img src="https://media-exp1.licdn.com/dms/image/C4E16AQF1zKrdt96GiQ/profile-displaybackgroundimage-shrink_200_800/0/1631803434696?e=1658966400&v=beta&t=QfONgdZunTZNQFze6u5wKFrv6elq2QXGRwJUF81VrTQ" width="100"></img>
        </p>
        </div>
        </div>
    </div>
  );
});

export default LargePrint;
