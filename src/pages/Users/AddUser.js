import { React, useState, useEffect } from 'react';
import { Divider, Button, Typography, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import styles from './AddUser.module.css';
import BootstrapInputField from '../../components/InputFields/BootstrapTextField';
import BootstrapCheckbox from '../../components/InputFields/BootsrapCheckbox';
import { Form, Formik } from 'formik';
import { userFormSchema } from './validationSchema';

const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: ' #5d9cec',
    color: 'white',
    borderRadius: '3px',
    boxShadow: 'none',
    textTransform: 'none',
    width: '100%',
    margin: '20px 0 30px 0',
  },
  label: {
    fontFamily: '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: '18px',
    fontWeight: '500',
    color: '#505458',
    marginTop: '20px',
  },
  chooseBtn: {
    backgroundColor: ' #5d9cec',
    color: 'white',
    borderRadius: '3px',
    boxShadow: 'none',
    textTransform: 'none',
    height: '30px',
  },
}));

const UserForm = (props) => {
  const classes = useStyles();

  const initialValues = {
    branch: props.action === 'edit' ? props.user.branch : '',
    username: props.action === 'edit' ? props.user.username : '',
    name: props.action === 'edit' ? props.user.firstName : '',
    lastname: props.action === 'edit' ? props.user.lastName : '',
    operatorCode: props.action === 'edit' ? props.user.operatorCode : '',
    position: props.action === 'edit' ? props.user.position : '',
    phone: props.action === 'edit' ? props.user.phone : '',
    email: props.action === 'edit' ? props.user.email : '',
    password: '',
    repeatPass: '',
  };

  const [labelList, setLabelList] = useState([
    { id: 1, label: 'manageProducts', checked: false },
    { id: 2, label: 'manageCategories', checked: false },
    { id: 3, label: 'manageTransactions', checked: false },
    { id: 4, label: 'manageUsers', checked: false },
    { id: 5, label: 'manageSettings', checked: false },
  ]);

  useEffect(() => {
    if (props.action === 'edit') {
    }
  }, [props.action, props.user]);

  const handleSubmit = (fields) => {
    // console.log(fields);
  };

  const handleEdit = (fields) => {
    // console.log('EDITTT');
  };

  const handleCheck = (id) => {
    setLabelList((prev) => {
      let index = prev.findIndex((item) => item.id === id);
      prev[index].checked = !prev[index].checked;
      return [...prev];
    });
  };

  // const handleClose = () => {
  //   props.handleClose();
  // };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={userFormSchema}
        onSubmit={(fields) => {
          props.action === 'edit' ? handleEdit(fields) : handleSubmit(fields);
        }}
      >
        {({ handleChange, handleBlur, errors, touched, values }) => (
          <Form>
            <div className={styles.body}>
              <Divider sx={{ border: '1px solid #e5e5e5', marginBottom: '10px' }} />
              <div className={styles.form}>
                <TextField
                  id="branch"
                  name="branch"
                  value={values.branch}
                  label="Dega"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.branch && Boolean(errors.branch)}
                  helperText={errors.branch}
                  size="small"
                  fullWidth
                  sx={{ marginBottom: '15px' }}
                />
                <TextField
                  id="username"
                  name="username"
                  value={values.username}
                  label="Përdoruesi"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={errors.username}
                  size="small"
                  fullWidth
                  sx={{ marginBottom: '15px' }}
                />
                <TextField
                  id="name"
                  name="name"
                  value={values.name}
                  label="Emri"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={errors.name}
                  size="small"
                  fullWidth
                  sx={{ marginBottom: '15px' }}
                />
                <TextField
                  id="lastname"
                  name="lastname"
                  value={values.lastname}
                  label="Mbiemri"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastname && Boolean(errors.lastname)}
                  helperText={errors.lastname}
                  size="small"
                  fullWidth
                  sx={{ marginBottom: '15px' }}
                />
                <TextField
                  id="operatorCode"
                  name="operatorCode"
                  value={values.operatorCode}
                  label="Kodi i operatorit"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.operatorCode && Boolean(errors.operatorCode)}
                  helperText={errors.operatorCode}
                  size="small"
                  fullWidth
                  sx={{ marginBottom: '15px' }}
                />
                <TextField
                  id="position"
                  name="position"
                  value={values.position}
                  label="Pozicioni"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.position && Boolean(errors.position)}
                  helperText={errors.position}
                  size="small"
                  fullWidth
                  sx={{ marginBottom: '15px' }}
                />
                <TextField
                  id="phone"
                  name="phone"
                  value={values.phone}
                  label="Celulari"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={errors.phone}
                  size="small"
                  fullWidth
                  sx={{ marginBottom: '15px' }}
                />
                <TextField
                  id="email"
                  name="email"
                  value={values.email}
                  label="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={errors.email}
                  size="small"
                  fullWidth
                  sx={{ marginBottom: '15px' }}
                />

                {props.action === 'add' && (
                  <>
                    <TextField
                      id="password"
                      name="password"
                      value={values.password}
                      label="Fjalekalimi"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={errors.password}
                      size="small"
                      fullWidth
                      sx={{ marginBottom: '15px' }}
                    />
                    <TextField
                      id="repeatPass"
                      name="repeatPass"
                      value={values.repeatPass}
                      label="Perserit fjalekalimin"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.repeatPass && Boolean(errors.repeatPass)}
                      helperText={errors.repeatPass}
                      size="small"
                      fullWidth
                      sx={{ marginBottom: '15px' }}
                    />
                  </>
                )}
                <Typography className={classes.label}>Rights</Typography>
                <Divider className={classes.divider} style={{ margin: '20px 0 10px 0' }} />
                {labelList.map((element) => (
                  <BootstrapCheckbox
                    key={element.id}
                    label={element.label}
                    checked={element.checked}
                    handleCheck={() => handleCheck(element.id)}
                  />
                ))}
                <Button className={classes.btn} variant="contained" type="submit">
                  {props.action === 'edit' ? 'Save Changes' : 'Add User'}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UserForm;
