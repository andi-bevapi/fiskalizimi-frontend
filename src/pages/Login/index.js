import { useState } from "react";
import { history, useModel } from 'umi';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { ErrorMessage, Form, Formik } from "formik";
import { login } from '../../services/user';
import { loginSchema } from './validationSchema';
import User from '../../models/User';
import styles from "./index.css";

const Login = () => {
    const { initialState, setInitialState } = useModel('@@initialState');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();

        if (userInfo) {
            const newUser = new User(userInfo);
            await setInitialState({ ...initialState, currentUser: newUser });
        }
    };

    const onLoginHandler = async (fields) => {
        try {
            const response = await login(fields);
            localStorage.setItem('token', response.data);
            await fetchUserInfo();
            history.push('/');
            return;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={loginSchema}
                onSubmit={(fields) => {
                    onLoginHandler(fields);
                }}>
                {({ handleChange, handleBlur, errors, touched, values }) => (
                    <Form>
                        <div className={styles.mainHolder}>
                            <div className={styles.subMainHolder}>
                                <div className={styles.lockerHolder}>
                                    <LockIcon
                                        style={{
                                            transform: "scale(1.8)",
                                            color: "rgba(0, 0, 0, 0.6)",
                                        }}
                                    />
                                    <Typography> Hyni në platformë</Typography>
                                </div>
                                <div className={styles.inputHolder}>
                                    <TextField
                                        label="username"
                                        id="username"
                                        name="username"
                                        type="username"
                                        value={values.username}
                                        label="Përdoruesi"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.username && Boolean(errors.username)}
                                        helperText={errors.username}
                                    />

                                    <TextField
                                        label="password"
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        label="Fjalëkalimi"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={errors.password}
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
                                            )
                                        }}
                                    />

                                    <Button variant="contained" type="submit">
                                        Hyr
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Login;
