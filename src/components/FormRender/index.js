import { Field } from 'formik';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Thumbnail from './Thumbnail';
import { isFile } from '../../helpers/isFile';

const Input = styled('input')({
  display: 'none',
});

const FormRender = ({ formFields }) => {
  return formFields.map((formField) => {
    switch (formField.component) {
      case 'Text':
        return (
          <Field name={formField.name} key={formField.name}>
            {({ field, meta }) => (
              <TextField
                label={formField.label}
                error={meta.touched && meta.error}
                helperText={meta.error}
                InputProps={{
                  style: {
                    fontFamily: 'Poppins',
                    marginBottom: 30,
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
        );
      case 'Number':
        return (
          <Field name={formField.name} key={formField.name}>
            {({ field, meta }) => (
              <TextField
                type="number"
                label={formField.label}
                error={meta.touched && meta.error}
                helperText={meta.error}
                InputProps={{
                  style: {
                    fontFamily: 'Poppins',
                    marginBottom: 30,
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
        );
      case 'Select':
        return (
          <Field name={formField.name} key={formField.name}>
            {({ field, meta }) => (
              <TextField
                select
                label={formField.label}
                error={meta.touched && meta.error}
                helperText={meta.error}
                InputProps={{
                  style: {
                    fontFamily: 'Poppins',
                    marginBottom: 30,
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
            )}
          </Field>
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
                {isFile(field.value) && (
                  <>
                    <br />
                    <br />
                    <Thumbnail file={field.value} />
                  </>
                )}
              </label>
            )}
          </Field>
        );
    }
  });
};

export default FormRender;
