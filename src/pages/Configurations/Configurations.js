import { Button, IconButton, Typography ,MenuItem, FormControlLabel, Checkbox, Grid, Container } from "@mui/material";
import { useState } from "react";
import SnackbarComponent from '../../../src/components/Snackbar';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import SaveIcon from '@mui/icons-material/Save';
import { useTranslation } from "react-i18next";
import { Form, Formik, Field } from "formik";
import {validationSchema} from "./validationSchema";
import {configure} from "../../services/configurations";
import { useModel } from 'umi';


const useStyles = makeStyles(() => ({
   rightFormContainer:{marginTop:"50px !important"},
   fieldContainer:{margin:"10px !important"},
   submitButtonStyle:{backgroundColor:"#FF7A00 !important"}
  }));

const Configurations = () => {
    const classes = useStyles();
    const { t,i18n } = useTranslation();
    const { initialState , refresh } = useModel('@@initialState');
    const [openSnackBar, setOpenSnackBar] = useState({ status: false, message: "" });

    const onSubmitHandler = async(values) =>{
        values.branchId = initialState?.currentUser?.branchId;
        values.isActive = true;
        values.isDeleted = false;
        delete values.messageBill;
        delete values.description;
        const result = await configure(values);
        setOpenSnackBar({ status: true, message: result.message });
        refresh();
    }
    const handleSnackBarClose = () => {
        setOpenSnackBar({ status: false });
      }

    return (
        <>

        <SnackbarComponent
            message={openSnackBar.message}
            open={openSnackBar.status}
            handleSnackBarClose={handleSnackBarClose}
            severity={"success"}
        />
        <h1>{t("configurations")}</h1>
            <Grid item xs={12} sm={6} md={6}>
                <Typography
                    style={{
                        fontSize: "18px",
                        fontFamily: "Poppins",
                        margin: '40px auto 20px 10px',
                        textAlign: "left"
                    }}
                > {t("chooseConfig")}</Typography>
            </Grid>
            <Formik initialValues={{ printer: "", language :"", allowSellsWithZero:"" , messageBill:"" , description :""}}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    onSubmitHandler(values);
                }}
            >
                <Form>
                <Grid container >
                    <Grid item xs={12} sm={6} md={6} display={'block'}>
                        <Grid className={classes.fieldContainer} item>
                            <Field name="allowSellsWithZero">
                                {({
                                    field,
                                    meta
                                }) => (
                                    <Checkbox
                                        label={t("allowPrice")}
                                        error={meta.touched && meta.error}
                                        helperText={meta.error}
                                        
                                        {...field}
                                    />
                                )}
                            </Field>
                            <span>{t("allowPrice")}</span>
                        </Grid>
                        <Grid className={classes.fieldContainer} item >
                            <Field name="printer">
                            {({ field, meta }) => (
                                <TextField
                                select = {1}
                                label={t("choosePrinter")}
                                error={meta.touched && meta.error}
                                helperText={meta.error}
                                
                                InputProps={{
                                    style: {
                                    fontFamily: 'Poppins',
                                    width: '350px',
                                    textAlign: 'left'
                                    },
                                }}
                                InputLabelProps={{
                                    style: {
                                    fontFamily: 'Poppins',
                                    },
                                }}
                                {...field}
                                >
                                    <MenuItem value="First Printer">
                                        <h4>First Printer</h4>
                                    </MenuItem>
                                    <MenuItem value="Second Printer">
                                        <h4>Second Printer</h4>
                                    </MenuItem>
                                    <MenuItem value="Thirt Printer">
                                        <h4>Thirt Printer</h4>
                                    </MenuItem>
                                </TextField>
                            )}
                            </Field>
                        </Grid>
                        <Grid className={classes.fieldContainer} item >
                            <Field name="messageBill">
                                    {({
                                        field,
                                        meta
                                    }) => (
                                        <TextField
                                            label={t("billMessage")}
                                            error={meta.touched && meta.error}
                                            helperText={meta.error}
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
                                            {...field}
                                        />
                                    )}
                            </Field>
                        </Grid>
                    </Grid>
                    <Grid className={classes.rightFormContainer} item xs={12} sm={6} md={6} display={'block'}>
                    <Grid className={classes.fieldContainer} item >
                        <Field name="language">
                        {({ field, meta }) => (
                            <TextField
                            select
                            label={t("chooseLanguage")}
                            error={meta.touched && meta.error}
                            helperText={meta.error}
                            
                            InputProps={{
                                style: {
                                fontFamily: 'Poppins',
                                width: '350px',
                                textAlign: 'left'
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                fontFamily: 'Poppins',
                                },
                            }}
                            {...field}
                            >
                                { Object.keys(i18n.store.data).map((el,index)=>{
                                    return(
                                        <MenuItem value={el}>
                                            <h4>{el === "sq" ? "Shqip" :"Anglisht"}</h4>
                                        </MenuItem>
                                    )
                                })}
                            </TextField>
                        )}
                        </Field>
                        </Grid>
                        <Grid className={classes.fieldContainer} item>
                            <Field name="description">
                                    {({
                                        field,
                                        meta
                                    }) => (
                                        <TextField
                                            label={t("billDescription")}
                                            error={meta.touched && meta.error}
                                            helperText={meta.error}
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
                                            {...field}
                                        />
                                    )}
                            </Field>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} display={'block'}>
                        <Grid item>
                            <Button className={classes.submitButtonStyle} variant="contained" type="submit" title="RUAJ"> <SaveIcon style={{marginRight:"10px"}}/> {t("save")}</Button>
                        </Grid>
                    </Grid>
                </Grid>
                </Form>
            </Formik>
        </>
    );
};

export default Configurations;