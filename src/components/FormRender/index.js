import { Field } from "formik";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';

const FormRender = ({ formFields }) => {
    return formFields.map(formField => {
        switch (formField.component) {
            case 'Text': {
                return (
                    <Field name={formField.name}>
                        {({
                            field,
                            meta
                        }) => (
                            <TextField
                                label={formField.label}
                                error={meta.touched && meta.error}
                                helperText={meta.error}
                                InputProps={{
                                    style: {
                                        fontFamily: "Poppins",
                                        marginBottom: 30
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontFamily: "Poppins"
                                    }
                                }}
                                {...field}
                            />
                        )}
                    </Field>
                )
            }
            case 'Number': {
                return (
                    <Field name={formField.name}>
                        {({
                            field,
                            meta
                        }) => (
                            <TextField
                                type="number"
                                label={formField.label}
                                error={meta.touched && meta.error}
                                helperText={meta.error}
                                InputProps={{
                                    style: {
                                        fontFamily: "Poppins",
                                        marginBottom: 30
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontFamily: "Poppins"
                                    }
                                }}
                                {...field}
                            />
                        )}
                    </Field>
                )
            }
            case 'Select': {
                return (
                    <Field name={formField.name}>
                        {({
                            field,
                            meta
                        }) => (
                            <TextField
                                select
                                label={formField.label}
                                error={meta.touched && meta.error}
                                helperText={meta.error}
                                InputProps={{
                                    style: {
                                        fontFamily: "Poppins",
                                        marginBottom: 30
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontFamily: "Poppins"
                                    }
                                }}
                                {...field}
                            >
                                {formField.options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    </Field>
                )
            }
        }
    });
};

export default FormRender;