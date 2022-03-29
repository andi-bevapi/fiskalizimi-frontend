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
import { Form, Formik, Field } from "formik";
import TextField from "@mui/material/TextField";

const ActionButtons = (props) => {
  const { deleteInvoice, invoiceFinalObject, listedInvoiceProducts, returnInvoiceObject, activeInvoice, setActiveInvoice, createPendingInvoice } = useInvoiceContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {

  }, [invoiceFinalObject]);

  const goToPaymentMethod = () => {
    (listedInvoiceProducts.length == 0 ? null : (setIsOpen(true)))
    returnInvoiceObject();
  }

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  const goToGeneratedInvoice = () => {

  }

  const freezeInvoice = () => {
    returnInvoiceObject();
    setActiveInvoice("pending");
    createPendingInvoice();

  }

  return (
    <div className={styles.actionButtonContainer}>
      <div
        sx={{
          width: '1050%',
        }}
      >
      </div>
      <div
        className={styles.buttonsList}
      >
        <Grid container marginBottom={1} spacing={1} alignItems="center" direction="row" justifyContent="center">
          <Grid item xs={12} sm={4} md={4} style={{ display: 'block', alignItems: "center" }}>
            <ButtonComponent
              title="FSHI"
              lightColor="rgb(240, 80, 80)"
              addIcon={false}
              onClick={deleteInvoice}
              icon={<BlockIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} style={{ display: 'block', alignItems: "center" }}>
            <ButtonComponent
              title="PAGUAJ"
              lightColor="#0d4d47"
              addIcon={false}
              onClick={goToPaymentMethod}
              icon={<LocalAtmIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} style={{ display: 'block', alignItems: "center" }}>
            <ButtonComponent
              title="RUAJ"
              lightColor="#74a19e"
              addIcon={false}
              onClick={freezeInvoice}
              icon={<PanToolIcon />}
            />
          </Grid>
          <ModalComponent open={isOpen} handleClose={toggleModal} title="">
            <span className={styles.payTitle}>Paguaj Faturën</span>
            <Divider style={{ marginTop: 10, marginBottom: 20 }} />
            <Grid container marginBottom={1} spacing={1} direction="row">
              <Grid item xs={12} sm={12} md={12} style={{ display: 'block' }}>
                <Formik
                  initialValues={{ description: "" }}
                  onSubmit={(values) => {
                    goToGeneratedInvoice(values);
                  }}
                >
                  <Form>
                    <div className={styles.subMainHolder}>
                      <div className={styles.inputHolder}>
                        <Field name="description">
                          {({
                            field,
                            meta
                          }) => (
                            <TextField
                              label="Përshkruaj Faturën"
                              multiline
                              error={meta.touched && meta.error}
                              helperText={meta.error}
                              InputProps={{
                                style: {
                                  fontFamily: "Poppins",
                                  resize: "both",
                                  width: 500
                                }
                              }}
                              InputLabelProps={{
                                style: {
                                  fontFamily: "Poppins"
                                }
                              }}
                              {...field}
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </Grid>
              <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', textAlign: "center" }}>
                <Grid item xs={12} sm={6} md={6} style={{ display: 'block' }}>
                  <Grid item xs={12} sm={12} md={12} style={{ display: 'block' }}>
                    <Formik
                      initialValues={{ sum: "" }}
                      onSubmit={(values) => {
                        goToGeneratedInvoice(values);
                      }}
                    >
                      <Form>
                        <div className={styles.subMainHolder}>
                          <div className={styles.inputHolder}>
                            <Field name="sum">
                              {({
                                field,
                                meta
                              }) => (
                                <TextField
                                  label="Vendosni Shumën"
                                  error={meta.touched && meta.error}
                                  helperText={meta.error}
                                  InputProps={{
                                    style: {
                                      fontFamily: "Poppins",
                                      resize: "both",
                                      width: 500
                                    }
                                  }}
                                  InputLabelProps={{
                                    style: {
                                      fontFamily: "Poppins"
                                    }
                                  }}
                                  {...field}
                                />
                              )}
                            </Field>
                          </div>
                        </div>
                      </Form>
                    </Formik>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} style={{ display: 'block' }}>
                    <span className={styles.totalPrice}>Kusuri: </span>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6} style={{ display: 'block', alignSelf: "center" }}>
                  <Grid item xs={12} style={{ display: 'block' }}>
                    <span className={styles.totalPrice}>Totali për tu paguar: {Number(invoiceFinalObject?.totalAmount).toFixed(2)} ALL</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ModalComponent>
        </Grid>
      </div>
    </div>
  );
};

export default ActionButtons;
