import { useState, useEffect, useRef } from 'react';
import { history, useModel } from 'umi';
import { useTranslation } from 'react-i18next';
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
import {validationSchema} from "./validationSchema";
import { useReactToPrint } from "react-to-print";
import InvoiceToPrint from '../../InvoiceCoupon/InvoiceToPrint';
import LargePrint from '../../InvoiceCoupon/LargePrint';
import Swal from 'sweetalert2';
import pageTitle from "../../../../../helpers/pageTitle";
import { useMoneyDepositContext } from '../../../../../Context/MoneyDepositContext';
import { useContextArka } from '../../../../../Context/ArkaContext';
import { getAllArka, checkAutoInsertDeclaration} from '../../../../../services/arka';

const ActionButtons = (props) => {
  const { t } = useTranslation();
  const {
    deleteInvoice,
    invoiceFinalObject,
    listedInvoiceProducts,
    returnInvoiceObject,
    createPendingInvoice,
    couponObject
  } = useInvoiceContext();
  const { addAmountToDeposit, updateAmount } = useMoneyDepositContext();
  const { autoInsertDeclaration } = useContextArka();
  let componentRef = useRef();
  let printRef = useRef();
  const [isOpen, setisOpen] = useState(false);
  const [freeze, setFreeze] = useState(false);
  const [isOpenStep2, setIsOpenStep2] = useState(false);
  const [openForFreeze, setOpenForFreeze] = useState(false);
  const [returnChange, setReturnChange] = useState(-Number(invoiceFinalObject?.totalAmount));
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [amount, setAmount] = useState(0);
  const [pageData,setPageData] = useState([]);
  const { initialState } = useModel('@@initialState');

  useEffect(()=>{
    setPageData(couponObject)
  },[couponObject]);

  useEffect(() => {
    setAmount(0);
  }, [isOpen])

  const handlePrint = useReactToPrint({
    onBeforePrint:() => {
      setPageData((prevState) =>{
        document.title = pageTitle(prevState)
      })
    },
    onAfterPrint:() =>{ document.title = "Fiskalizimi"},
    content: () =>{
      return componentRef.current;
    } 
  });

  const handleLargePrint = useReactToPrint({
    onBeforePrint:() => {
      setPageData((prevState) =>{
        document.title = pageTitle(prevState)
      })
    },
    onAfterPrint:() =>{ document.title = "Fiskalizimi"},
    content: () => printRef.current
  });

  useEffect(() => {
    (!returnChange ? (setReturnChange(-Number(invoiceFinalObject?.totalAmount))) : null);
  }, [invoiceFinalObject]);


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
    window.location.reload(false);
  }

  const toggleModalFreeze = () => {
    if (listedInvoiceProducts.length > 0) setOpenForFreeze(!openForFreeze);
  }

  const goToGeneratedInvoice = async (values) => {

      try{
        await returnInvoiceObject(true, values.description, values.message);
        const moneyDepositId = JSON.parse(localStorage.getItem('deposit')).id;
        const amountTotal = Number(invoiceFinalObject?.totalAmount).toFixed(2);
        const allDeposits = await getAllArka(initialState?.currentUser?.branchId);
        const selectedDeposit =  allDeposits.data.filter((d) => d.id == moneyDepositId)[0];
        const result = await checkAutoInsertDeclaration({item:selectedDeposit , userId : initialState?.currentUser?.id});
        if(result?.status != 409){
            updateAmount(moneyDepositId, 0);
        }
        addAmountToDeposit(moneyDepositId, amountTotal);
        setisOpen(false);
        openPrintSwal();
      } catch(err){

        console.log("error--in action buttons--",err);

        setisOpen(false);
        openNotFiscalizeModal();
       
      }

      // await returnInvoiceObject(true, values.description, values.message);
      // //Handle MoneyDeposit Update
      // const moneyDepositId = JSON.parse(localStorage.getItem('deposit')).id;
      // const amountTotal = Number(invoiceFinalObject?.totalAmount).toFixed(2);
      // const allDeposits = await getAllArka(initialState?.currentUser?.branchId);
      // const selectedDeposit =  allDeposits.data.filter((d) => d.id == moneyDepositId)[0];
      // const result = await checkAutoInsertDeclaration({item:selectedDeposit , userId : initialState?.currentUser?.id});
      // if(result?.status != 409){
      //     updateAmount(moneyDepositId, 0);
      // }
      // addAmountToDeposit(moneyDepositId, amountTotal);
      // setisOpen(false);
      // openPrintSwal();

  }
  
  const  checkclickOutside = () =>{
    return true;
  }

  const openNotFiscalizeModal = () => {
    Swal.fire({
      title:
        "<h5 style='font-family: Poppins; font-size: 20px; color: #082e2b; font-weight: 600'>" +
        t("canNotFiscalized") +
        '</h5>',
      text: '',
      icon: 'info',
      iconColor: '#98bbb8',
      showDenyButton: true,
      showConfirmButton: false,
      allowOutsideClick: () => checkclickOutside(),
      confirmButtonColor: '#0d4d47',
      denyButtonColor: '#f87800',
      denyButtonText: t("closeModal"),
    }).then((result) => {
      checkclickOutside()
    })
  }

  const openPrintSwal = () => {
    Swal.fire({
      title:
        "<h5 style='font-family: Poppins; font-size: 20px; color: #082e2b; font-weight: 600'>" +
        t("choosePrint") +
        '</h5>',
      text: '',
      icon: 'info',
      iconColor: '#98bbb8',
      showDenyButton: true,
      showConfirmButton: true,
      allowOutsideClick: () => checkclickOutside(),
      confirmButtonColor: '#0d4d47',
      denyButtonColor: '#f87800',
      denyButtonText: t("printCoupon"),
      confirmButtonText: t("printAfour"),
    }).then((result) => {
      if (result.isDenied) {
        handlePrint()
      } else if (result.isConfirmed) {
        handleLargePrint()
      }
      deleteInvoice();
    });
};


  const calculateMoney = (value) => {
    switch (value) {
      case "C":
        setAmount(0);
        setReturnChange(-Number(invoiceFinalObject?.totalAmount));
        setDisabledSubmit(true);
        break;

      case "D":
        setAmount(Math.floor(amount / 10));
        setReturnChange(Number(Math.floor(amount / 10)) - Number(invoiceFinalObject?.totalAmount).toFixed(2));
        if (Number(amount + String(value)) >= Number(invoiceFinalObject?.totalAmount).toFixed(2)) {
          setDisabledSubmit(false)
        } else {
          setDisabledSubmit(true)
        }
        break;

      default:
        setAmount(amount + String(value));
        if (Number(amount + String(value)) >= Number(invoiceFinalObject?.totalAmount).toFixed(2)) {
          setDisabledSubmit(false)
        } else {
          setDisabledSubmit(true)
        }
        const returnMoney = (Number(amount + String(value)) - Number(invoiceFinalObject?.totalAmount)).toFixed(2);
        (isNaN(returnMoney) ? (setReturnChange(-Number(invoiceFinalObject?.totalAmount))) : (setReturnChange(returnMoney)));
    }
  }

  const savePendingInvoice = async (values) => {
    setFreeze(true);
    setOpenForFreeze(false);
    await returnInvoiceObject(false, values.idCode);
  }

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
              title={t("delete")}
              lightColor="rgb(240, 80, 80)"
              addIcon={false}
              onClick={deleteInvoice}
              icon={<BlockIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} style={{ display: 'block', alignItems: 'center' }}>
            <ButtonComponent
              title={t("savePending")}
              lightColor="#74a19e"
              addIcon={false}
              onClick={toggleModalFreeze}
              icon={<PanToolIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} style={{ display: 'block', alignItems: 'center' }}>
            <ButtonComponent
              title={t("pay")}
              lightColor="#0d4d47"
              addIcon={false}
              onClick={goToPaymentMethod}
              icon={<LocalAtmIcon />}
            />
          </Grid>

          {/* Modali paguaj faturen */}

          <ModalComponent open={isOpen} handleClose={toggleModal} title="">
            <Formik
              initialValues={{ description: "", message: "" }}
              onSubmit={(values) => {
                goToGeneratedInvoice(values);
              }}
            >
              <Form>
                <span className={styles.payTitle}>{t("payInvoice")}</span>
                <Divider style={{ marginTop: 10, marginBottom: 20 }} />

                {/* containeri i madh */}
                <Grid container marginBottom={1} spacing={1}>

                  {/* containeri i majte plus calculatorin pervec kusurit dhe butonit vazhdo*/}
                  <Grid container xs={12} sm={12} md={12} lg={12}>

                    {/* containeri ne te majte */}
                    <Grid container xs={12} sm={6} md={6} lg={6}>

                      <div className={styles.subMainHolder}>
                        <div className={styles.paymentMethodsDiv}>

                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <span className={styles.totalPrice}>{t("chooseWayOfPayment")} </span> <br /><br />
                          </Grid>

                          <Grid container display={'flex'}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <Button className={styles.cashPayment}>
                                {t("cash")}
                              </Button><br />
                            </Grid>

                            {/* <Grid item xs={12} sm={12} md={12} lg={12}>
                              <Button className={styles.bankPayment} disabled={true}>
                                {t("creditCard")}
                              </Button>
                            </Grid> */}
                          </Grid>
                        </div>
                      </div>
                    </Grid>

                    <Grid container xs={12} sm={6} md={6} lg={6}>

                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className={styles.subMainHolder}>
                          <span className={styles.totalPrice}>{t("totalToPay")}{Number(invoiceFinalObject?.totalAmount).toFixed(2)} LEK</span>
                        </div>
                      </Grid>

                      <div className={styles.subMainHolder}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <div className={styles.amountEntered}>
                            <span className={styles.describeInvoice}><b>{t("amount")}</b> &nbsp; {Number(amount)} LEK</span>
                          </div>
                        </Grid>
                        <br />

                        <Grid container xs={12} sm={12} md={12} lg={12} className={styles.calculatorDiv}>
                          <div className={styles.calculatorButtons}>
                            <Grid item xs={4} md={4}>
                              <Button className={styles.numberButton} onClick={() => { calculateMoney(1) }}> 1 </Button>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Button className={styles.numberButton} onClick={() => { calculateMoney(2) }}> 2 </Button>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Button className={styles.numberButton} onClick={() => { calculateMoney(3) }}> 3 </Button>
                            </Grid>
                          </div>
                          
                          <div className={styles.calculatorButtons}>
                            <Grid item xs={4} md={4}>
                              <Button className={styles.numberButton} onClick={() => { calculateMoney(4) }}> 4 </Button>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Button className={styles.numberButton} onClick={() => { calculateMoney(5) }}> 5 </Button>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Button className={styles.numberButton} onClick={() => { calculateMoney(6) }}> 6 </Button>
                            </Grid>
                          </div>
                        
                          <div className={styles.calculatorButtons}>
                            <Grid item xs={4} md={4}>
                              <Button className={styles.numberButton} onClick={() => { calculateMoney(7) }}> 7 </Button>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Button className={styles.numberButton} onClick={() => { calculateMoney(8) }}> 8 </Button>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Button className={styles.numberButton} onClick={() => { calculateMoney(9) }}> 9 </Button>
                            </Grid>
                          </div>
                         
                          <div className={styles.calculatorButtons}>
                            <Grid item xs={4} md={4}>
                              <Button className={styles.numberButton} onClick={() => { calculateMoney("C") }}> C </Button>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Button className={styles.numberButton} onClick={() => { calculateMoney(0) }}> 0 </Button>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Button className={styles.numberButton} onClick={() => { calculateMoney("D") }}> Fshi </Button>
                            </Grid>
                          </div>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={styles.subMainHolder}>
                      <span className={styles.describeInvoice}><b>{t("theRest")} </b> &nbsp; {Number(returnChange).toFixed(2)} LEK</span>
                    </div>
                    <div className={styles.subMainHolder}>
                      <Button variant="contained" type="submit" className={styles.buttonStyle} disabled={disabledSubmit}>
                        {t("continue")}
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </ModalComponent>
        </Grid>

        <ModalComponent open={isOpenStep2} handleClose={toggleModalStep2} title="">
          <InvoiceCoupon data={couponObject} />
        </ModalComponent>
        <ModalComponent open={openForFreeze} handleClose={toggleModalFreeze} title="">
            <Formik
              initialValues={{ idCode: ''}}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                savePendingInvoice(values);
              }}
            >
              <Form>
                <span className={styles.payTitle}>{t("codeIdentifierText")}</span>
                <Divider style={{ marginTop: 10, marginBottom: 20 }} />
                <Field name="idCode">
                  {({field, meta
                  }) => (
                    <TextField
                      label={t("identifierCode")}
                      error={meta.touched && meta.error}
                      FormHelperTextProps={{
                        style: {width:"250px"}
                      }}
                      helperText={meta.error}
                      InputProps={{
                        style: {
                          fontFamily: "Poppins",
                          resize: "both",
                          width: "auto",
                        }
                      }}
                      InputLabelProps={{
                        style: {
                          fontFamily: "Poppins",
                        }
                      }}
                      style ={{width: '100%'}} 
                      {...field}
                    />
                  )}
                </Field>
                <br></br>
                <Button variant="contained" style={{ marginTop: 16}}  type="submit">
                  {t("save")}
                </Button>
              </Form>
            </Formik>
        </ModalComponent>
      </div>
      {Object.keys(couponObject).length > 0 && <InvoiceToPrint data={couponObject} ref={componentRef}/>}
      {Object.keys(couponObject).length > 0 && <LargePrint data={couponObject} ref={printRef}/>}
    </div>
  );
};

export default ActionButtons;
