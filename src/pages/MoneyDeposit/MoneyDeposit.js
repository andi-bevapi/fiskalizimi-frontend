import { useState } from "react";
import Grid from '@mui/material/Grid';
import { Divider, Button } from '@mui/material';
import styles from './index.css';
import TextField from "@mui/material/TextField";
import DepositButtonComponent from "../../components/Button/DepositButton";
import ModalComponent from "../../components/Modal/Modal";
import { Form, Formik, Field } from 'formik';
import { useMoneyDepositContext } from "../../Context/MoneyDepositContext";

const MoneyDeposit = () => {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isReduceModalOpen, setIsReduceModalOpen] = useState(false);
    const [isValidAmount, setIsValidAmount] = useState(true);
    const {
        depositAmount,
        updateAmount,
        addAmountToDeposit,
        reduceAmountFromDeposit
    } = useMoneyDepositContext();


    const toggleUpdateModal = () => {
        setIsUpdateModalOpen(!isUpdateModalOpen);
    }

    const toggleAddModal = () => {
        setIsAddModalOpen(!isAddModalOpen);
    }

    const toggleReduceModal = () => {
        setIsReduceModalOpen(!isReduceModalOpen);
    }

    const checkReducedAmount = (value) => {
        (value > depositAmount ? setIsValidAmount(false) : setIsValidAmount(true))
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} md={12}>
                    <span className={styles.title}>Arka</span>
                </Grid>
            </Grid>
            <Grid container className={styles.mt20}>
                <Grid item xs={12} md={12}>
                    <span className={styles.subTitle}>Gjendja e Arkës:  <b>{depositAmount.toFixed(2)} ALL</b> </span>


                </Grid>
            </Grid>
            <Grid container className={styles.mt50}>
                <Grid item xs={12} md={12} className={styles.stateGrid}>
                    <Grid item xs={12} md={3} lg={3}>
                        <DepositButtonComponent
                            title="Ndrysho Gjendjen"
                            lightColor="#12ac7a"
                            addIcon={false}
                            className={styles.changeAmountBtn}
                            onClick={toggleUpdateModal}
                        />
                    </Grid>
                    <Grid item md={3}>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <DepositButtonComponent
                            title="Shto në Arkë"
                            lightColor="#74a19e"
                            addIcon={false}
                            className={styles.addAmountBtn}
                            onClick={toggleAddModal}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <DepositButtonComponent
                            title="Zbrit nga Arka"
                            lightColor="#f05050"
                            addIcon={false}
                            className={styles.reduceAmountBtn}
                            onClick={toggleReduceModal}
                        />
                    </Grid>
                </Grid>
            </Grid>


            <ModalComponent open={isUpdateModalOpen} handleClose={toggleUpdateModal} title="">
                <Formik
                    initialValues={{ amount: depositAmount }}
                    onSubmit={(values) => {
                        updateAmount(values.amount);
                        toggleUpdateModal()
                    }}
                >
                    <Form>
                        <span className={styles.payTitle}>Vendosni gjendjen e re të arkës</span>
                        <Divider style={{ marginTop: 10, marginBottom: 20 }} />
                        <Field name="amount">
                            {({ field }) => (
                                <TextField
                                    type='number'
                                    label="Shuma"
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
                        <span className={styles.currency}> (ALL)</span>
                        <div className={styles.subMainHolder}>
                            <Button variant="contained" type="submit" className={styles.buttonStyle}>
                                Ndrysho
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </ModalComponent>

            <ModalComponent open={isAddModalOpen} handleClose={toggleAddModal} title="">
                <Formik
                    initialValues={{ amount: '' }}
                    onSubmit={(values) => {
                        addAmountToDeposit(values.amount);
                        toggleAddModal()
                    }}
                >
                    <Form>
                        <span className={styles.payTitle}>Shkruani sasinë që doni të shtoni në arkë</span>
                        <Divider style={{ marginTop: 10, marginBottom: 20 }} />
                        <Field name="amount">
                            {({ field }) => (
                                <TextField
                                    type='number'
                                    label="Shuma"
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
                        <span className={styles.currency}> (ALL)</span>
                        <div className={styles.subMainHolder}>
                            <Button variant="contained" type="submit" className={styles.buttonStyle}>
                                Shto
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </ModalComponent>

            <ModalComponent open={isReduceModalOpen} handleClose={toggleReduceModal} title="">
                <Formik
                    initialValues={{ amount: '' }}
                    onSubmit={(values) => {
                        reduceAmountFromDeposit(values.amount);
                        toggleReduceModal()
                    }}
                >
                    <Form>
                        <span className={styles.payTitle}>Shkruani sasinë që doni të zbrisni nga arka</span>
                        <Divider style={{ marginTop: 10, marginBottom: 20 }} />
                        <Field name="amount">
                            {({ field }) => (
                                <TextField
                                    type='number'
                                    label="Shuma"
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
                                    onChange={checkReducedAmount(field.value)}
                                    className={styles.amountInput}
                                    {...field}
                                />
                            )}

                        </Field>
                        <span className={styles.currency}> (ALL)</span>
                        <br />
                        {!isValidAmount ? (
                            <span className={styles.warning}> Nuk mund të hiqni nga arka një vlerë më të madhe se gjendja e arkës!</span>
                        ) : null}
                        <br />
                        <div className={styles.subMainHolder}>
                            <Button variant="contained" type="submit" className={styles.buttonStyle} disabled={!isValidAmount}>
                                Zbrit
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </ModalComponent>
        </>
    );
};

export default MoneyDeposit;