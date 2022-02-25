import styles from "./Login.module.css";
import TextField from "@mui/material/TextField";
import { IconButton, Button, Typography ,Alert} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { useMainAuth } from "../../Context/AuthContext";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import {Formik, Form , useFormik , ErrorMessage} from "formik";
import * as yup from 'yup';

const loginSchema = yup.object({
  username : yup.string().min(2,"Emri duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni emrin"),
  password : yup.string().min(4,"Fjalekalimi duhet te kete me shume se 4 karaktere").required("Ju lutem vendosni fjalekalimin")
})


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {login}  = useMainAuth();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const customHandleSubmit = async (fields ) => {
      const response = await login(fields);
      //console.log("response-----",response);
      return response;
  }

  return (
    <>
        <Formik initialValues={{username:"",password:""}} validationSchema={loginSchema} onSubmit={ (fields) => {
            console.log("fields--",fields);
            customHandleSubmit(fields)
          }}>
          {
            formik => (
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
                          value={formik.values.username}
                          label="Përdoruesi"
                          onChange={formik.handleChange}
                          onBlur = {formik.handleBlur}
                          error={formik.touched.username && Boolean(formik.errors.username)}
                        />
                          <ErrorMessage component="div" name="username" />
                          <FormControl>
                              <InputLabel htmlFor="Fjalëkalimi">Fjalëkalimi</InputLabel>
                              <OutlinedInput
                                label="password"
                                id="Fjalëkalimi"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur = {formik.handleBlur}
                                value={formik.values.password}
                                type={showPassword ? "text" : "password"}
                                label="Fjalëkalimi"
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      edge="end"
                                    >
                                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                          
                            <ErrorMessage component="div" name="password" />
                          </FormControl>
                          <Button variant="contained" type="submit">
                            Hyr
                          </Button>
                      </div>
                  </div>
                </div>
              </Form>
            )
          }
        </Formik>
    </>
  );
};

export default Login;
