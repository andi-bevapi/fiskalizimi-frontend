import { useState } from "react";
import Grid from '@mui/material/Grid';
import { Divider, Button } from '@mui/material';
import styles from './index.css';
import TextField from "@mui/material/TextField";
import DepositButtonComponent from "../../components/Button/DepositButton";
import ModalComponent from "../../components/Modal/Modal";
import { Form, Formik, Field } from 'formik';
import { useMoneyDepositContext } from "../../Context/MoneyDepositContext";
import { useTranslation } from "react-i18next";

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
    const {t} = useTranslation();


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
                    <span className={styles.title}>{t("ark")}</span>
                </Grid>
            </Grid>
            <Grid container className={styles.mt20}>
                <Grid item xs={12} md={12}>
                    <span className={styles.subTitle}> {t("cashCondition")} <b>{depositAmount.toFixed(2)} ALL</b> </span>
                </Grid>
            </Grid>
            <Grid container className={styles.mt50}>
                <Grid item xs={12} md={12} className={styles.stateGrid}>
                    <Grid item xs={12} md={3} lg={3}>
                        <DepositButtonComponent
                            title={t("startingAmount")}
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
                            title={t("addMoneyDeposit")}
                            lightColor="#74a19e"
                            addIcon={false}
                            className={styles.addAmountBtn}
                            onClick={toggleAddModal}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <DepositButtonComponent
                            title={t("removeMoneyDeposit")}
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
                        <span className={styles.payTitle}>{t("insertCashStatus")}</span>
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
                                {t("changeAmount")}
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
                        <span className={styles.payTitle}>{t("writeCashToAddAmount")}</span>
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
                                {t("add")}
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
                        <span className={styles.payTitle}>{t("writeCashToWithdrow")}</span>
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
                            <span className={styles.warning}>{t("noValueGreater")}</span>
                        ) : null}
                        <br />
                        <div className={styles.subMainHolder}>
                            <Button variant="contained" type="submit" className={styles.buttonStyle} disabled={!isValidAmount}>
                                {t("substract")}
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </ModalComponent>
        </>
    );
};

export default MoneyDeposit;