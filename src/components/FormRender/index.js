import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { makeStyles } from '@mui/styles';
import { Field } from 'formik';
import Thumbnail from './Thumbnail';
import { isFile } from '../../helpers/isFile';

const useStyles = makeStyles(() => ({
  inputContainer: {
    marginBottom: 30,
  },
}));

const Input = styled('input')({
  display: 'none',
});

const FormRender = ({ formFields, editProduct, disableField }) => {
  const classes = useStyles();

  return formFields.map((formField) => {
    switch (formField.component) {
      case 'Text':
        return (
          <div
            className={classes.inputContainer}
            key={formField.name}
            style={{ width: '100%', minWidth: 200 }}
          >
            <Field name={formField.name}>
              {({ field, meta }) => (
                <TextField
                  label={formField.label}
                  error={meta.touched && meta.error}
                  helperText={meta.error}
                  style={{
                    width: '100%',
                  }}
                  InputProps={{
                    style: {
                      fontFamily: 'Poppins',
                      width: '100%',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: 'Poppins',
                    },
                  }}
                  disabled={
                    !disableField ? false : !formField.disabled ? false : formField.disabled
                  }
                  {...field}
                />
              )}
            </Field>
          </div>
        );
      case 'Number':
        return (
          <div className={classes.inputContainer} key={formField.name}>
            <Field name={formField.name}>
              {({ field, meta }) => (
                <TextField
                  type="number"
                  label={formField.label}
                  error={meta.touched && meta.error}
                  helperText={meta.error}
                  style={{
                    width: '100%',
                  }}
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
          </div>
        );
      case 'Select':
        return (
          <div
            className={classes.inputContainer}
            key={formField.name}
            style={{ width: '100%', minWidth: 200 }}
          >
            <Field name={formField.name}>
              {({ field, form: { setFieldValue }, meta }) => {
                return (
                  <TextField
                    select
                    label={formField.label}
                    error={meta.touched && meta.error}
                    helperText={meta.error}
                    style={{
                      width: '100%',
                      ...formField.style,
                    }}
                    InputProps={{
                      style: {
                        fontFamily: 'Poppins',
                        width: '100%',
                        textAlign: 'left',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontFamily: 'Poppins',
                      },
                    }}
                    // {...field}
                    disabled={
                      !disableField ? false : !formField.disabled ? false : formField.disabled
                    }
                    defaultValue={formField.defaultValue && editProduct === false ? 2 : field.value}
                    onChange={(event) => {
                      setFieldValue(formField.name, event.target.value);
                    }}
                  >
                    {formField.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              }}
            </Field>
          </div>
        );
      case 'SelectNoDefault':
        return (
          <div
            className={classes.inputContainer}
            key={formField.name}
            style={{ width: '100%', minWidth: 200 }}
          >
            <Field name={formField.name}>
              {({ field, form: { setFieldValue }, meta }) => {
                return (
                  <TextField
                    select
                    label={formField.label}
                    error={meta.touched && meta.error}
                    helperText={meta.error}
                    style={{
                      width: '100%',
                      ...formField.style,
                    }}
                    InputProps={{
                      style: {
                        fontFamily: 'Poppins',
                        width: '100%',
                        textAlign: 'left',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontFamily: 'Poppins',
                      },
                    }}
                    {...field}
                  >
                    {formField.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              }}
            </Field>
          </div>
        );
      case 'Checkbox':
        return (
          <Field name={formField.name} key={formField.name}>
            {({ field, meta }) => (
              <>
                <FormControlLabel
                  control={<Checkbox checked={field.value} />}
                  label={formField.label}
                  {...field}
                />
                <br />
              </>
            )}
          </Field>
        );
      case 'Upload':
        return (
          <Field name={formField.name} key={formField.name}>
            {({ field, form: { setFieldValue }, meta }) => (
              <label htmlFor={formField.name}>
                <Input
                  accept="image/*"
                  id={formField.name}
                  type="file"
                  onChange={(event) => {
                    setFieldValue(formField.name, event.target.files[0]);
                  }}
                />
                <Button variant="contained" component="span">
                  {formField.label}
                </Button>
                {field.value && isFile(field.value) ? (
                  <>
                    <br />
                    <br />
                    <Thumbnail file={field.value} />
                  </>
                ) : (
                  field.value && <img src={field.value} width="80px" height="80px" />
                )}
              </label>
            )}
          </Field>
        );
      case 'Date':
        return (
          <Field name={formField.name} key={formField.name}>
            {({ field, form: { setFieldValue }, meta }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label={formField.label}
                  id={formField.name}
                  name={formField.name}
                  {...field}
                  onChange={val =>
                  setFieldValue(formField.name, val)}
                  renderInput={(params) => <TextField {...params}  sx={{ marginBottom: '30px' }}/>}
                />
              </LocalizationProvider>
            )}
          </Field>
        );
    }
  });
};

export default FormRender;
