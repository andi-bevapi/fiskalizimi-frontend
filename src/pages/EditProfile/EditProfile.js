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

const EditProfile = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const { t } = useTranslation();
  const [userValue, setUserValue] = useState(initialState.currentUser);
  const {userToUpdate} = useContextUser();
  const [openSnackBar, setOpenSnackBar] = useState({ status: false, message: "" });

  useEffect(() => {
    refresh();
  }, []);

  const handleSubmit =  async(values) => {
      const id = userValue.id;
      values.branchId = userValue.branchId;
      values.clientId = userValue.clientId;
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
          password: "" 
        }}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          handleSubmit(values)
        }}
      >
        <Form>
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
                <div style={{ margin: '10px' }}>
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
          <Button variant="contained" type="submit">
            <SaveIcon style={{ marginRight: 10 }} /> {t('save')}
          </Button>
        </Form>
      </Formik>
    </>
  );
};
export default EditProfile;