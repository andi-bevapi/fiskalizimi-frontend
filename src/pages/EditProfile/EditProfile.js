import { Form, Formik, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import { useHistory, useModel } from 'umi';
import { useState, useEffect } from 'react';
import {useContextUser} from "../../context/UserContext";
import SnackbarComponent from "../../components/Snackbar";
import {validationSchema} from "./validationSchema";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  fieldContainer:{
    margin:"10px",
    width:"250px",
    float:"left"
  },
  container:{
    width: "600px",
    display: "block",
    overflow: "hidden",
    margin: "0 auto"
  }
}));

const EditProfile = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const { t } = useTranslation();
  const [userValue, setUserValue] = useState(initialState.currentUser);
  const {userToUpdate} = useContextUser();
  const [openSnackBar, setOpenSnackBar] = useState({ status: false, message: "" });
  const classes = useStyles();

  useEffect(() => {
    refresh();
  }, []);

  const handleSubmit =  async(values) => {
      const id = userValue.id;
      values.branchId = userValue.branchId;
      values.clientId = userValue.clientId;
      delete values["passwordConfirm"];
      const permissions = userValue.permissions;
      const userData = {user:values,permissions}
      console.log("userData-----",userData);
      const result = await userToUpdate(id,userData);
      console.log("result-----",result);
      setOpenSnackBar({ status: true, message: result.message });
    };

  return (
    <>
      <SnackbarComponent
        message={openSnackBar.message}
        open={openSnackBar.status}
        severity={"success"}
      />
      <h4>{t("editData")}</h4>
      <Formik
        initialValues={{
          phone:initialState.currentUser.phone,
          firstName:initialState.currentUser.firstName,
          lastName:initialState.currentUser.lastName,
          email:initialState.currentUser.email,
          username: initialState.currentUser.username,
          password: "",
          passwordNew:"",
          passwordConfirm:""
        }}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          handleSubmit(values)
        }}
      >
        <Form>
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
                      <div style={{ margin: '10px'}}>
                          <Field name={el}>
                              {({field,meta
                              }) => (
                                <TextField
                                  label={t(el)}
                                  error={meta.touched && meta.error}
                                  helperText={meta.error}
                                  key={index}
                                  value={userValue[el]}
                                  {...field}
                              />
                              )}
                        </Field>
                      </div>
                    );
                  }
                })}
            </div>
            <div className={classes.fieldContainer}>
                <div style={{ margin: '10px' }}>
                    <Field name="password">
                        {({field, meta
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
                <div style={{ margin: '10px' }}>
                    <Field name="passwordNew">
                        {({field, meta
                            }) => (
                              <TextField
                                label={t('passwordNew')}
                                type="password"
                                error={meta.touched && meta.error}
                                helperText={meta.error}
                                {...field}
                              />
                            )}
                    </Field>
                </div>
                <div style={{ margin: '10px' }}>
                    <Field name="passwordConfirm">
                        {({field, meta
                            }) => (
                              <TextField
                                label={t('passwordConfirm')}
                                type="password"
                                error={meta.touched && meta.error}
                                helperText={meta.error}
                                {...field}
                              />
                            )}
                    </Field>
                </div>
            </div>
          </div>
          <Button variant="contained" type="submit">
              <SaveIcon style={{ marginRight: 10 }} /> {t('save')}
          </Button>
        </Form>
      </Formik>
    </>
  );
};
export default EditProfile;