import { Drawer } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Form, Formik } from "formik";
import { useState, useEffect } from 'react';
import FormRender from '../FormRender';
import SnackbarComponent from '../Snackbar';
import SaveIcon from '@mui/icons-material/Save';
import { isFile } from '../../helpers/isFile';

const useStyles = makeStyles(() => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 50,
    width: 400
  }
}));

const SidebarAction = (props) => {
  const classes = useStyles();

  const [fields, setFields] = useState(props.formFields);
  const [openSnackBar, setOpenSnackBar] = useState({ status: false, message: "", success: false });

  useEffect(() => {
    fillSelectOptions();
  }, [props.formFields, props.open]);

  const fillSelectOptions = () => {
    if(!props.contexts) return;

    Object.keys(props.contexts).map(context => {
      const options = props.contexts[context].map(el => {
        return {
          value: el.id,
          label: el.name
        }
      })
  
      let formattedFields = [...fields];
  
      formattedFields = formattedFields.map(field => {
        if (field?.options?.length === 0 && field.identifier === context) field.options = options;
        return field;
      });
  
      setFields(formattedFields);
    })
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    props.setOpenSideBar(!open);
    props.setEditItem(null);
  };

  const handleSnackBarClose = () => {
    setOpenSnackBar({ status: false });
  }

  const generateInitialValues = () => {
    let initialValues = {};

    if (props.editItem) {
      fields.forEach(field => {
        initialValues[field.name] = props.editItem[field.name];
      });
      initialValues['id'] = props.editItem.id;
    } else {
      fields.forEach(field => {
        initialValues[field.name] = "";
        if (field.component === 'Checkbox') initialValues[field.name] = false;
      });
    }
    return initialValues;
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleSubmit = (values) => {
    let file, fileKeyName = null;

    Object.entries(values).map(item => {
      if (isFile(item[1])) {
        file = item[1];
        fileKeyName = item[0];
      }
    });

    if (file) {
      getBase64(file).then(result => {
        values[fileKeyName] = result;
        postData(values);
      });
      return;
    }

    postData(values);
  };

  const postData = async (values) => {
    const action = props.editItem ? props.update : props.create;

    const response = await action(values);

    if (response?.statusCode === 200) {
      setOpenSnackBar({ status: true, message: response.message, success: true });
      props.setOpenSideBar(false);
      return;
    }

    const resJson = await response.json();
    setOpenSnackBar({ status: true, message: resJson.message, success: false });
  };

  return (
    <>
      <SnackbarComponent
        message={openSnackBar.message}
        open={openSnackBar.status}
        handleSnackBarClose={handleSnackBarClose}
        severity={openSnackBar.success ? "success" : "error"}
      />

      <Drawer
        anchor="left"
        open={props.open}
        onClose={toggleDrawer('left', !props.open)}
      >
        <Formik
          initialValues={generateInitialValues()}
          validationSchema={props.validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form className={classes.formContainer}>
            <FormRender formFields={fields} />

            <Button variant="contained" type="submit">
              <SaveIcon style={{ marginRight: 10 }} /> Ruaj
            </Button>
          </Form>
        </Formik>
      </Drawer>
    </>
  );
};

export default SidebarAction;