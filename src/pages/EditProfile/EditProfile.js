import { Form, Formik, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import { useHistory, useModel } from 'umi';
import { useState, useEffect } from 'react';
import { useUsersListContext } from "../../Context/UsersListContext";
import SnackbarComponent from "../../components/Snackbar";
import { validationSchema } from "./validationSchema";
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { padding } from '@mui/system';

const useStyles = makeStyles(() => ({
  fieldContainer: {
    margin: "10px 0px",
    width: "250px",
    float: "left",
    padding: "0px"
  },
  container: {
    width: "600px",
    display: "block",
    overflow: "hidden",
    margin: "0 auto",
    paddingTop: "16px"
  }
}));

const EditProfile = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const { t } = useTranslation();
  const [userValue, setUserValue] = useState(initialState.currentUser);
  const { userToUpdate } = useUsersListContext();
  const [openSnackBar, setOpenSnackBar] = useState({ status: false, message: "" });
  const classes = useStyles();



  useEffect(() => {
    refresh();
  }, []);

  const handleSubmit = async (values) => {
    const id = userValue.id;
    values.branchId = userValue.branchId;
    values.clientId = userValue.clientId;
    delete values["passwordConfirm"];
    const permissions = userValue.permissions;
    const userData = { user: values, permissions }
    const result = await userToUpdate(id, userData);
    setOpenSnackBar({ status: true, message: result.message });
    refresh();
  };

  return (
    <>
      <SnackbarComponent
        message={openSnackBar.message}
        open={openSnackBar.status}
        severity={"success"}
      />
      <h1 align="center">{t("editData")}</h1>
      <Formik
        initialValues={{
          phone: initialState.currentUser.phone,
          firstName: initialState.currentUser.firstName,
          lastName: initialState.currentUser.lastName,
          email: initialState.currentUser.email,
          username: initialState.currentUser.username,
          password: "",
          passwordNew: "",
          passwordConfirm: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values)
        }}
      >
        <Form>
        <Grid container direction="row" display='flex' justifyContent='space-between'>
              <div className={classes.container}>
              <div className={classes.fieldContainer}>
                {Object.keys(initialState.currentUser).map((el, index) => {
                  if (
                    el !== 'id' &&
                    el !== 'position' &&
                    el !== 'branchId' &&
                    el !== 'clientId' &&
                    el !== 'permissions' &&
                    el !== 'operatorCode'
                  ) {
                    return (
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div style={{ margin: '15px auto' }}>
                          <Field name={el}>
                            {({ field, meta
                            }) => (
                              <TextField
                                label={t(el)}
                                error={meta.touched && meta.error}
                                helperText={meta.error}
                                key={index}
                                value={userValue[el]}
                                InputProps={{
                                  style: {
                                    fontFamily: 'Poppins',
                                     width: 'auto',
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
                        </div>
                      </Grid>
                    );
                  }
                })}
              </div>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className={classes.fieldContainer}>
                  <div style={{ margin: '10px auto' }}>
                    <Field name="password">
                      {({ field, meta
                      }) => (
                        <TextField
                          label={t('password')}
                          type="password"
                          error={meta.touched && meta.error}
                          helperText={meta.error}
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                  <div style={{ margin: '10px auto' }}>
                    <Field name="passwordNew">
                      {({ field, meta
                      }) => (
                        <TextField
                          label={t('passwordNew')}
                          type="password"
                          error={meta.touched && meta.error}
                          helperText={meta.error}
                          InputProps={{
                            style: {
                              fontFamily: 'Poppins',
                               width: 'auto',
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
                  </div>
                  <div style={{ margin: '10px auto' }}>
                    <Field name="passwordConfirm">
                      {({ field, meta
                      }) => (
                        <TextField
                          label={t('passwordConfirm')}
                          type="password"
                          error={meta.touched && meta.error}
                          helperText={meta.error}
                          InputProps={{
                            style: {
                              fontFamily: 'Poppins',
                               width: 'auto',
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
                  </div>
                </div>
              </Grid>
            </div>
          </Grid>
          <Button variant="contained" type="submit">
            <SaveIcon style={{ marginRight: 10 }} /> {t('save')}
          </Button>
        </Form>
      </Formik>
    </>
  );
};
export default EditProfile;