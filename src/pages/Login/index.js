import { useState } from 'react';
import { history, useModel } from 'umi';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Form, Formik, Field } from 'formik';
import { login, getCurrentUser,checkFirstTimeLogin } from '../../services/user';
import { loginSchema } from './validationSchema';
import User from '../../models/User';
import SnackbarComponent from '../../components/Snackbar';
import styles from './index.css';
import LoginIcon from '@mui/icons-material/Login';
import poslaLogo from '../../assets/images/poslamark.png';
import Box from '@mui/material/Box';

const Login = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      const newUser = new User(userInfo);
      await setInitialState({ ...initialState, currentUser: newUser });
    }
  };

  const onLoginHandler = async (values) => {
    try {
      const response = await login(values);
      if (response.statusCode === 200) {
        localStorage.setItem('poslaToken', response.data);
        await fetchUserInfo();

        const result = await getCurrentUser();
        if (!result.data.isFirstTimeLogin) {
          history.push('/arka');
          await checkFirstTimeLogin(result.data.id);
          return;
        } else {
          history.push('/');
          return;
        }
      }

      const resJson = await response.json();

      setLoginMessage(resJson.message);
      setIsSuccess(response.statusCode === 200);
      setOpenSnackBar(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.mainHolder}>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          onLoginHandler(values);
        }}
      >
        <Form>
          <div className={styles.subMainHolder}>
            <div className={styles.lockerHolder}>
              <Box
                component="img"
                sx={{
                  width: 170,
                  marginBottom: 5,
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt="The house from the offer."
                src={poslaLogo}
              />
              <Typography
                style={{
                  fontSize: '35px',
                  fontFamily: 'Poppins',
                }}
              >
                {' '}
                Hyni në platformë
              </Typography>
            </div>
            <div className={styles.inputHolder}>
              <Field name="username">
                {({ field, meta }) => (
                  <TextField
                    label="Përdoruesi"
                    error={meta.touched && meta.error}
                    helperText={meta.error}
                    InputProps={{
                      style: {
                        fontFamily: 'Poppins',
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

              <Field name="password">
                {({ field, meta }) => (
                  <TextField
                    type={showPassword ? 'text' : 'password'}
                    label="Fjalëkalimi"
                    error={meta.touched && meta.error}
                    helperText={meta.error}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {!showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: {
                        fontFamily: 'Poppins',
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

              <Button variant="contained" type="submit" className={styles.buttonStyle}>
                <LoginIcon style={{ marginRight: 10 }} /> Hyr
              </Button>
            </div>
          </div>
        </Form>
      </Formik>

      <SnackbarComponent
        message={loginMessage}
        open={openSnackBar}
        handleSnackBarClose={() => {
          setOpenSnackBar(false);
        }}
        severity={isSuccess ? 'success' : 'error'}
      />
    </div>
  );
};

export default Login;
