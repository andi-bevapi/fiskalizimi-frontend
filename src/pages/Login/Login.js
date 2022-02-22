import styles from "./Login.module.css";
import TextField from "@mui/material/TextField";
import { IconButton, Button, Typography ,Alert} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { useMainAuth } from "../../components/Context/AuthContext";
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

  const handleSubmit = (e , values) => {
    e.preventDefault()
     console.log("values-----",values);
  }

  return (
    <>
        <Formik initialValues={{username:"",password:""}} validationSchema={loginSchema} >
          {
            formik => (
              <div className={styles.mainHolder}>
                {/* {console.log("touched------",formik)} */}
                
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
        
                  <form className={styles.inputHolder} onSubmit={(e)=>{handleSubmit(e,formik.values)}}>
                    <TextField
                      label="username"
                      name="username"
                      type="username"
                      id="username"
                      value={formik.values.username}
                      label="Përdoruesi"
                     
                      onChange={formik.handleChange}
                      onBlur = {formik.handleBlur}
                    />
                    {formik.errors.username && formik.touched.username &&  <Alert severity="error">{formik.errors.username}!</Alert> }
        
                    <FormControl>
                      <InputLabel htmlFor="Fjalëkalimi">Fjalëkalimi</InputLabel>
                      <OutlinedInput
                        label="password"
                        id="Fjalëkalimi"
                        name="password"
                        
                        onChange={formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value={formik.values.password}
                        type={showPassword ? "text" : "password"}
                        label="Fjalëkalimi"
                        onChange={formik.handleChange}
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
                      {formik.errors.password && formik.touched.password &&  <Alert severity="error">{formik.errors.password}!</Alert> }
                    </FormControl>
        
                    <Button variant="contained" type="submit">
                      Hyr
                    </Button>
                  </form>
                </div>
              </div>
            )
          }
        </Formik>
    </>
  );
};

export default Login;
