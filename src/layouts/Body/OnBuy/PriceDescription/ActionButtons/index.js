import { useState, useEffect } from 'react';
import { Divider, Button } from '@mui/material';
import ButtonComponent from '../../../../../components/Button/InvoiceButton';
import BlockIcon from '@mui/icons-material/Block';
import PanToolIcon from '@mui/icons-material/PanTool';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import styles from '../../../OnBuy/ItemsOnBuy.module.css';
import { Grid } from '@mui/material';
import { useInvoiceContext } from '../../../../../Context/InvoiceContext';
import ModalComponent from '../../../../../components/Modal/Modal';
import { Form, Formik, Field } from 'formik';
import TextField from '@mui/material/TextField';
import InvoiceCoupon from './../../InvoiceCoupon/InvoiceCoupon';

const ActionButtons = (props) => {
  const {
    deleteInvoice,
    invoiceFinalObject,
    listedInvoiceProducts,
    returnInvoiceObject,
    createPendingInvoice,
    couponObject
  } = useInvoiceContext();
  const [isOpen, setisOpen] = useState(false);
  const [freeze, setFreeze] = useState(false);
  const [isOpenStep2, setIsOpenStep2] = useState(false);
  const [returnChange, setReturnChange] = useState();
  const [disabledSubmit, setDisabledSubmit] = useState(true);


  useEffect(() => {
    if (freeze) createPendingInvoice();
    setFreeze(false);
  }, [invoiceFinalObject]);

  const goToPaymentMethod = () => {
    (listedInvoiceProducts.length == 0 ? null : (setisOpen(true)))
    returnInvoiceObject(false);
  };

  const toggleModal = () => {
    setisOpen(!isOpen);
  }

  const toggleModalStep2 = () => {
    setIsOpenStep2(!isOpenStep2);
    deleteInvoice();
  }

  const goToGeneratedInvoice = async (values) => {
    await returnInvoiceObject(true, values.description, values.message);
    setisOpen(false);
    setIsOpenStep2(true);
  }

  const calculateMoney = (field) => {
    if (Number(field.value) >= Number(invoiceFinalObject?.totalAmount).toFixed(2)) {
      setDisabledSubmit(false)
    } else {
      setDisabledSubmit(true)
    }
    const returnMoney = (Number(field.value) - Number(invoiceFinalObject?.totalAmount)).toFixed(2);
    (isNaN(returnMoney) ? (setReturnChange(-Number(invoiceFinalObject?.totalAmount))) : (setReturnChange(returnMoney)));
  }

  const freezeInvoice = () => {
    setFreeze(true);
    returnInvoiceObject();
  };

  return (
    <div className={styles.actionButtonContainer}>
      <div
        sx={{
          width: '1050%',
        }}
      ></div>
      <div className={styles.buttonsList}>
        <Grid
          container
          marginBottom={1}
          spacing={1}
          alignItems="center"
          direction="row"
          justifyContent="center"
        >
          <Grid item xs={12} sm={4} md={4} style={{ display: 'block', alignItems: 'center' }}>
            <ButtonComponent
              title="FSHI"
              lightColor="rgb(240, 80, 80)"
              addIcon={false}
              onClick={deleteInvoice}
              icon={<BlockIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} style={{ display: 'block', alignItems: 'center' }}>
            <ButtonComponent
              title="RUAJ"
              lightColor="#74a19e"
              addIcon={false}
              onClick={freezeInvoice}
              icon={<PanToolIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} style={{ display: 'block', alignItems: 'center' }}>
            <ButtonComponent
              title="PAGUAJ"
              lightColor="#0d4d47"
              addIcon={false}
              onClick={goToPaymentMethod}
              icon={<LocalAtmIcon />}
            />
          </Grid>
          <ModalComponent open={isOpen} handleClose={toggleModal} title="">
            <Formik
              initialValues={{ description: "", message: "" }}
              onSubmit={(values) => {
                goToGeneratedInvoice(values);
              }}
            >
              <Form>
                <span className={styles.payTitle}>Paguaj Faturën</span>
                <Divider style={{ marginTop: 10, marginBottom: 20 }} />
                <Grid container marginBottom={1} spacing={1} direction="row">
                  <Grid item xs={12} sm={12} md={12} style={{ display: 'flex' }}>
                    <div className={styles.subMainHolder}>
                      <div className={styles.inputHolder}>
                        <span className={styles.describeInvoice}>Përshkrimi:</span>
                        <Field name="description">
                          {({ field, meta }) => (
                            <TextField
                              label="Përshkruaj Faturën"
                              multiline
                              error={meta.touched && meta.error}
                              helperText={meta.error}
                              InputProps={{
                                style: {
                                  fontFamily: "Poppins",
                                  resize: "both",
                                  width: 500,
                                  marginTop: -15
                                }
                              }}
                              InputLabelProps={{
                                style: {
                                  fontFamily: "Poppins",
                                  marginTop: -15
                                }
                              }}
                              {...field}
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} style={{ display: 'flex' }}>
                    <div className={styles.subMainHolder}>
                      <div className={styles.inputHolder}>
                        <span className={styles.messageInvoice}>Mesazhi i faturës:</span>
                        <Field name="message">
                          {({
                            field,
                            meta
                          }) => (
                            <TextField
                              label="p.sh: Ju Faleminderit!"
                              multiline
                              error={meta.touched && meta.error}
                              helperText={meta.error}
                              InputProps={{
                                style: {
                                  fontFamily: "Poppins",
                                  resize: "both",
                                  width: 500,
                                  marginTop: -15
                                }
                              }}
                              InputLabelProps={{
                                style: {
                                  fontFamily: "Poppins",
                                  marginTop: -15
                                }
                              }}
                              {...field}
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={styles.subMainHolder}>
                      <div className={styles.inputHolder}>
                        <span className={styles.describeInvoice}>Shuma:  &nbsp; &nbsp; &nbsp;</span>
                        <Field name="sum">
                          {({
                            field,
                            meta
                          }) => (
                            <TextField
                              onChange={calculateMoney(field)}
                              type="number"
                              label="Vendosni Shumën"
                              error={meta.touched && meta.error}
                              helperText={meta.error}
                              InputProps={{
                                style: {
                                  fontFamily: "Poppins",
                                  resize: "both",
                                  width: 500,
                                  marginTop: -15
                                }
                              }}
                              InputLabelProps={{
                                style: {
                                  fontFamily: "Poppins",
                                  marginTop: -15
                                }
                              }}
                              {...field}
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                    <div className={styles.subMainHolder}>
                      <span className={styles.totalPrice}>Totali për tu paguar: {Number(invoiceFinalObject?.totalAmount).toFixed(2)} ALL</span>
                    </div>
                  </Grid>
                  <Grid item xs={12} style={{ display: 'block' }}>
                    <div className={styles.subMainHolder}>
                      <span className={styles.describeInvoice}><b>Kusuri: </b> &nbsp; {Number(returnChange).toFixed(2)}  ALL</span>
                    </div>
                  </Grid>
                </Grid>
                <Button variant="contained" type="submit" className={styles.buttonStyle} disabled={disabledSubmit}>
                  Vazhdo
                </Button>
              </Form>
            </Formik>
          </ModalComponent>
        </Grid>
        <ModalComponent open={isOpenStep2} handleClose={toggleModalStep2} title="">
          <InvoiceCoupon data={couponObject}/>
        </ModalComponent>
      </div>
    </div>
  );
};

export default ActionButtons;
