import { useState, useEffect } from "react";
import { history, useModel } from 'umi';
import Grid from '@mui/material/Grid';
import { Divider, CardMedia, Button } from '@mui/material';
import styles from './index.css';
import TextField from "@mui/material/TextField";
import DepositButtonComponent from "../../components/Button/DepositButton";
import ModalComponent from "../../components/Modal/Modal";
import { Form, Formik, Field } from 'formik';
import { useMoneyDepositContext } from "../../Context/MoneyDepositContext";
import { useTranslation } from "react-i18next";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useContextArka } from "../../Context/ArkaContext";
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2'

const MoneyDeposit = () => {
    const { arkaList, selectedADeposit } = useContextArka();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [depositEvent, setDepositEvent] = useState();
    const [amount, setAmount] = useState('');
    const [selectedDeposit, setSelectedDeposit] = useState();
    const [firstOption,setFirstOption] = useState(true);

    const {
        updateAmount,
        addAmountToDeposit,
        reduceAmountFromDeposit
    } = useMoneyDepositContext();

    const {t} = useTranslation();

    useEffect(() => {
        if(localStorage.getItem('deposit')){
           setSelectedDeposit(JSON.parse(localStorage.getItem('deposit')))
        }
    }, [arkaList])


    useEffect(()=>{
        setTimeout(() =>{
            if(firstOption === true){
                setFirstOption(false);
            }
        },(1000 * 60 * 60) * 24);
    },[firstOption])

    const toggleUpdateModal = () => {
        setIsUpdateModalOpen(!isUpdateModalOpen);
    }

    const noChange = () => {
        history.push('/');
    }

    const checkAmount = (val) => {
        setAmount(val.value)
    }

    const selectDeposit = (item) => {
      selectedADeposit(item)
      localStorage.setItem('deposit', JSON.stringify(item));
      setIsUpdateModalOpen(true);
    }

    const disableSelectOption = (value) =>{
        console.log("value----",value);
        if(value.amount){
            setFirstOption(false);
        }
    }

    const submitDepositForm = (values) => {
        if(values.amount != '' && values.amount){
            switch(depositEvent){
                case "initial":
                    disableSelectOption(values);
                    updateAmount(JSON.parse(localStorage.getItem('deposit')).id, values.amount);
                    break;
                case "add":
                    addAmountToDeposit(JSON.parse(localStorage.getItem('deposit')).id, values.amount)
                    break;
                case "remove":
                    reduceAmountFromDeposit(JSON.parse(localStorage.getItem('deposit')).id, values.amount)
                    break;
            }

            Swal.fire({
                title:
                  "<h5 style='font-family: Poppins; font-size: 20px; color: #082e2b; font-weight: 600'>" +
                  `Deklarimi u regjistrua` +
                  '</h5>',
                text: '',
                icon: 'success',
                iconColor: '#a5dc86',
                showDenyButton: false,
                showConfirmButton: true,
                confirmButtonColor: '#58a8b3',
                confirmButtonText: `Mbyll`,
              }).then((result) => {
                if (result.isConfirmed) {
                  history.push('/')
                } 
              });
        }else return;

    }

    const useStyles = makeStyles(() => ({
        card: {
          height: 'auto',
          width: '90%',
          padding: '10px 5px 0 3px',
          backgroundColor: "#f7f7f7 !important",
          boxShadow: 'none',
          borderRadius: '5',
          marginLeft: 0,
          marginBottom: 10,
          '&:hover': {
            transition: 'transform 0.2s ease-in-out',
            transform: 'scale(1.05)',
            cursor: 'pointer',
          },
        },

        activeCard: {
            height: 'auto',
          width: '90%',
          padding: '10px 5px 0 3px',
          backgroundColor: '#ffffff !important',
          border: '3px solid #12ac7a !important',
          boxShadow: 'none',
          borderRadius: '5',
          marginLeft: 0,
          marginBottom: 10,
          '&:hover': {
            transition: 'transform 0.2s ease-in-out',
            transform: 'scale(1.05)',
            cursor: 'pointer',
          },
        }
    }));

    const classes = useStyles();

    return (
        <>
            <Grid container>
                <Grid item xs={12} md={12}>
                    <span className={styles.title}>Zgjidhni arkën</span>
                </Grid>
            </Grid>
            <Divider />
            <Grid container className={styles.mt20}>
                <Grid item xs={12} md={12} style={{display: "flex"}}>
                   {arkaList?.map((item, index) => {
                       return(
                        <>
                        <Grid item xs={12} md={3} lg={3} onClick={() => selectDeposit(item)}>
                            <Card className={selectedDeposit?.name == item.name ? classes.activeCard : classes.card}>
                                <CardContent
                                    style={{
                                    padding: '5px',
                                    textAlign: 'center',
                                    marginTop: 2,
                                    }}
                                >
                                    <div
                                    style={{
                                        width: '100%',
                                    }}
                                    >
                                      <Typography className={styles.subTitle}> {item.name} </Typography>
                                    </div>
                                    <br />
                                    <Typography className={styles.serialNumber}>
                                        {t('SerialNumber')}: {item.serialNumber}
                                    </Typography>
                                    <br />
                                </CardContent>
                            </Card>
                        </Grid>
                        </>
                       );
                   })}
                </Grid>
            </Grid>

            <ModalComponent open={isUpdateModalOpen} handleClose={toggleUpdateModal} title="">
                <Formik
                    initialValues={{ }}
                    onSubmit={(values) => {
                        submitDepositForm(values)
                    }}
                >
                    <Form>
                     <Grid container>
                        <Grid item xs={12} md={12} className={styles.stateGrid}>
                            <Grid item xs={12} md={12}>
                               <span className={styles.payTitle}>Shtoni një deklarim</span>
                               <Divider style={{ marginTop: 10, marginBottom: 20 }} />
                            </Grid>
                            <Grid item xs={12} md={12} style={{display: "flex", marginBottom: 20}}>
                                <Grid item xs={12} sm={4} md={4}>
                                    <TextField
                                        select
                                        label="Veprimi"
                                        style={{
                                            width: '100%',
                                            }}
                                        InputProps={{
                                        style: {
                                            fontFamily: 'Poppins',
                                            width: '100%',
                                            textAlign: 'left',
                                        },
                                        }}
                                        InputLabelProps={{
                                        style: {
                                            fontFamily: 'Poppins',
                                        },
                                        }}
                                        onChange={(event) => { setDepositEvent(event.target.value) }}
                                        >
                                            <MenuItem disabled={firstOption} key="initial" value="initial"><span>Deklarim fillestar</span></MenuItem>
                                            <MenuItem key="add" value="add"><span>Shtim</span></MenuItem>
                                            <MenuItem key="remove" value="remove"><span>Tërheqje</span></MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item sm={1} md={1}></Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <Field name="amount">
                                        {({ field }) => (
                                            <TextField
                                                type='number'
                                                label="Shuma"
                                                onChange={checkAmount(field)}
                                                InputProps={{
                                                    style: {
                                                        fontFamily: "Poppins"
                                                    }
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        fontFamily: "Poppins"
                                                    }
                                                }}
                                                className={styles.amountInput}
                                                {...field}
                                            />
                                        )}

                                    </Field>
                                </Grid>
                           </Grid>
                        </Grid>
                        <br/>
                        <Grid item xs={12} md={12} className={styles.stateGrid}>
                           <Grid xs={12} sm={6} md={6}></Grid>
                           <Grid xs={12} sm={3} md={3}>
                                <DepositButtonComponent
                                    title="Asnjë deklarim"
                                    lightColor="#f05050"
                                    addIcon={false}
                                    className={styles.reduceAmountBtn}
                                    onClick={noChange}
                                />
                           </Grid>
                           <Grid xs={12} sm={3} md={3}>
                            <Button type="submit" className={styles.changeAmountBtn}>
                                    <span>Ruaj</span>
                                </Button>
                           </Grid>
                        </Grid>
                     </Grid>
                    </Form>
                </Formik>
            </ModalComponent>
        </>
    );
};

export default MoneyDeposit;