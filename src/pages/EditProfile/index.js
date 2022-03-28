import { Form, Formik } from 'formik';
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { useHistory, useModel } from 'umi';
import { useState, useEffect } from 'react';

export default () => {
    const { initialState, refresh } = useModel('@@initialState');
    const {t} = useTranslation();
    const [userValue,setUserValue] = useState(initialState.currentUser);

    useEffect(() => {
        refresh();
    }, [])

    const handleChange = (e,el) =>{
        console.log("e-----",e.target.value);
        console.log("el-----",el);


    }

    const handleSubmit = (e,values) => {
        e.preventDefault();
        console.log("values-----",values)

    }


    return (
       <>
        <h4>Edit</h4>
        <Formik onSubmit={(values) => {
            handleSubmit(values);
          }}>
            <Form>
                { Object.keys(initialState.currentUser).map((el,index)=>{
                    //console.log("el-----",el);
                    return  <div>
                                <TextField id="outlined-required" onChange={(e)=>{handleChange(e,el)}} key={index} value={userValue[el]}/>
                            </div>
                })}

                <Button variant="contained" type="submit">
                    <SaveIcon style={{ marginRight: 10 }} /> Ruaj
                </Button>
            </Form>
        </Formik>
       </>
    )
}
