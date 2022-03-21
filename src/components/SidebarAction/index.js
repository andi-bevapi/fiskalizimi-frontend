import {
  Drawer
} from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Form, Formik } from "formik";
import { useState, useEffect } from 'react';
import FormRender from '../FormRender';
import SnackbarComponent from '../Snackbar';
import { useCategoryContext } from "../../Context/CategoryContext";
import SaveIcon from '@mui/icons-material/Save';

const useStyles = makeStyles(() => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 50,
    width: 400
  }
}));

const SidebarAction = (props) => {
  const { categoryList } = useCategoryContext();

  const classes = useStyles();

  const [fields, setFields] = useState(props.formFields);
  const [openSnackBar, setOpenSnackBar] = useState({ status: false, message: "", success: false });

  useEffect(() => {
    fillSelectOptions();
  }, [props.formFields, props.open]);

  const fillSelectOptions = () => {
    const options = categoryList.map(el => {
      return {
        value: el.id,
        label: el.name
      }
    })

    let formattedFields = [...fields];
    
    formattedFields = formattedFields.map(field => {
      if(field.options) field.options = options;
      return field;
    });

    setFields(formattedFields);
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

    if(props.editItem) {
      fields.forEach(field => {
        initialValues[field.name] = props.editItem[field.name];
      });
      initialValues['id'] = props.editItem.id;
    } else {
      fields.forEach(field => {
        initialValues[field.name] = "";
      });
    }

    return initialValues;
  };

  const handleSubmit = async (values) => {
    const action = props.editItem ? props.update : props.create;
    const response = await action({
      ...values
    });

    if(response.statusCode === 200) {
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