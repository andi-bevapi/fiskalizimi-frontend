import { useEffect } from 'react';
import {
  Button,
  IconButton,
  Typography,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useState } from 'react';
import SnackbarComponent from '../../../src/components/Snackbar';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import SaveIcon from '@mui/icons-material/Save';
import { useTranslation } from 'react-i18next';
import { Form, Formik, Field } from 'formik';
import { validationSchema } from './validationSchema';
import { configure } from '../../services/configurations';
import { useModel } from 'umi';
import { useConfigProvider } from '../../Context/ConfigurationsContext';
import style from "./Config.css";

const useStyles = makeStyles(() => ({
  rightFormContainer: { marginTop: '50px !important', display: 'block' },
  fieldContainer: { margin: '10px 0px !important' },
  submitButtonStyle: { backgroundColor: '#FF7A00 !important' , width:120 , height:40 },
  iconStyles: { marginRight: '10px' },
  setMax: {maxWidth: "220px;"}
}));

const Configurations = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { initialState, refresh } = useModel('@@initialState');
  const [openSnackBar, setOpenSnackBar] = useState({ status: false, message: '' });
  const { config } = useConfigProvider();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    generateInitialValues();
    setIsChecked(config?.allowSellsWithZero);
  }, [config]);

  const onSubmitHandler = async (values) => {
    values.branchId = initialState?.currentUser?.branchId;
    values.isActive = true;
    values.isDeleted = false;
    if (config) values.id = config.id;
    i18n.changeLanguage(values.language);
    const result = await configure(values);
    setOpenSnackBar({ status: true, message: result.message });
    refresh();
  };
  const handleSnackBarClose = () => {
    setOpenSnackBar({ status: false });
  };

  const generateInitialValues = () => {
    let initialValues = {};
    initialValues.printer = config ? config?.printer : '',
    initialValues.language = config ? config?.language : '',
      initialValues.allowSellsWithZero = config ? config?.allowSellsWithZero : false;
    initialValues.billMessage = config ? config.billMessage : '';
    initialValues.billDescription = config ? config.billDescription : '';
    return initialValues;
  };

  const handleCheckBox = (e) =>{
    setIsChecked(e.target.checked);
  }
 
  return (
    <>
      <SnackbarComponent
        message={openSnackBar.message}
        open={openSnackBar.status}
        handleSnackBarClose={handleSnackBarClose}
        severity={'success'}
      />
      <h1>{t('configurations')}</h1>
      <Formik
        initialValues={generateInitialValues()}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmitHandler(values);
        }}
      >
        <Form>
          <Grid container>
            <Grid xs={12} sm={12} md={12}>
            <Grid item className={classes.fieldContainer}>
                <Box sx={{ minWidth: 120}}>
                    <Field name="allowSellsWithZero">
                    {({ field, meta }) => (
                        <Checkbox
                        checked={isChecked}
                        onClick={handleCheckBox}
                        label={t('allowPrice')}
                        error={meta.touched && meta.error}
                        helperText={meta.error}
                        {...field}
                        />
                    )}
                    </Field>
                    <span>{t("allowPrice")}</span>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid container display='flex' justifyContent='space-between'>
            <Grid xs={12} sm={12} md={12}>
              {/* <Grid item className={classes.fieldContainer}>
              <div className={style.InputProps}>
                <Box sx={{ minWidth: 120}}>
                  <Field name="printer">
                    {({ field, meta }) => (
                      <TextField
                        select={1}
                        label={t('choosePrinter')}
                        error={meta.touched && meta.error}
                        helperText={meta.error}
                        InputProps={{
                          style: {
                            fontFamily: 'Poppins',
                            width: '250px',
                            textAlign: 'left',
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
                </Box>
                </div>
              </Grid> */}
              <Grid item>
              <div className={style.InputProps}>
                <Box sx={{ minWidth: 120}}>
                  <Field name="billMessage"  InputProps={{style: {maxWidth: '350px'}}}>
                    {({ field, meta }) => (
                      <TextField
                        label={t('billMessage')}
                        error={meta.touched && meta.error}
                        helperText={meta.error}
                        InputProps={{
                          style: {
                            fontFamily: 'Poppins',
                            width: '250px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            fontFamily: 'Poppins',
                          },
                        }}
                        {...field}
                      />
                    )}
                  </Field>
                </Box>
                </div>
              </Grid>
            </Grid>
            <Grid xs={12} sm={12} md={12}>
              <Grid item className={classes.fieldContainer}>
              <div className={style.InputProps}>
                <Box sx={{ minWidth: 120}}>
                  <Field name="language">
                    {({ field, meta }) => (
                      <TextField
                        select
                        label={t('chooseLanguage')}
                        error={meta.touched && meta.error}
                        helperText={meta.error}
                        InputProps={{
                          style: {
                            fontFamily: 'Poppins',
                            width: '250px',
                            textAlign: 'left',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            fontFamily: 'Poppins',
                          },
                        }}
                        {...field}
                      >
                        {Object.keys(i18n.store.data).map((el, index) => {
                          return (
                            <MenuItem value={el}>
                              <h4>{el === 'sq' ? 'Shqip' : 'Anglisht'}</h4>
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    )}
                  </Field>
                </Box>
                </div>
              </Grid>
              <Grid item>
              <div className={style.InputProps}>
                <Box sx={{ minWidth: 120}}>
                  <Field name="billDescription" InputProps={{style: {maxWidth: '350px'}}}>
                    {({ field, meta }) => (
                      <TextField
                        label={t('billDescription')}
                        error={meta.touched && meta.error}
                        helperText={meta.error}
                        InputProps={{
                          style: {
                            fontFamily: 'Poppins',
                            width: '250px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            fontFamily: 'Poppins',
                          },
                        }}
                        {...field}
                      />
                    )}
                  </Field>
                </Box>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
                <Grid xs={12} sm={12} md={12}>
                    <Grid item className={classes.fieldContainer}>
                        <Box sx={{ minWidth: 120}}>
                            <Button
                                className={classes.submitButtonStyle} 
                                variant="contained" 
                                type="submit" 
                                title="RUAJ"> 
                                <SaveIcon  className={classes.iconStyles}/> 
                                    {t("save")}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  );
};

export default Configurations;
