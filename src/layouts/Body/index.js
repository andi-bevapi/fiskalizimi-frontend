import ItemsOnBuy from './OnBuy/ItemsOnBuy.js';
// import ItemsOnStock from './ItemsOnStock/ItemsOnStock';
import styles from './Body.module.css';
// import Transactions from './Transactions/Transactions';
import Grid from '@mui/material/Grid';
import { InvoiceProvider } from '../../Context/InvoiceContext.js';
import { useModel } from 'umi';

const Body = (props) => {
  const { initialState, refresh } = useModel('@@initialState');
  //   const { open } = useSettingsContext();

  // if ('usb' in navigator) {
  //   console.log('supported');
  //   navigator.usb.getDevices().then((devices) => {
  //     console.log(devices);
  //     if (devices.length == 0) {
  //       let button = document.getElementById('request-device');
  //       button.addEventListener('click', async () => {
  //         console.log("hereee");
  //         let device;
  //         try {
  //           device = await navigator.usb.requestDevice({
  //             filters: [
  //               {
  //                 vendorId: 0x03F0
  //               },
  //             ],
  //           });
  //           console.log(device);
  //           // navigator.usb.getDevices().then((devices) => {
  //           //   console.log(devices);
  //           // })
  //         } catch (err) {
  //           // No device was selected.
  //         }

  //         if (device !== undefined) {
  //           // Add |device| to the UI.
  //         }
  //       });
  //     }
  //   });
  // }

  return (
    <Grid container columnSpacing={2} rowSpacing={2} className={styles.wrapper}>
      {initialState?.currentUser?.branchId !== 0 ? (
        <>
          <Grid item xs={12} md={8}>
            <div className={styles.itemsOnStock}>{props.children}</div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={styles.itemsOnBuy}>
              <ItemsOnBuy />
            </div>
          </Grid>
        </>
      ) : (
        <Grid item xs={12} md={12}>
          <div className={styles.itemsOnStock}>{props.children}</div>
        </Grid>
      )}
      {/* <button id="request-device">click</button> */}
    </Grid>
  );
};

export default Body;
