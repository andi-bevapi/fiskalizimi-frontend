import { Drawer } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import FormRender from '../FormRender';
import SnackbarComponent from '../Snackbar';
import { useCategoryContext } from '../../Context/CategoryContext';
import SaveIcon from '@mui/icons-material/Save';
import BootstrapCheckbox from '../InputFields/BootsrapCheckbox';
const useStyles = makeStyles(() => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 50,
    width: 400,
  },
}));

const SidebarAction = (props) => {
  const { categoryList } = useCategoryContext();

  const classes = useStyles();

  const [fields, setFields] = useState(props.formFields);
  const [openSnackBar, setOpenSnackBar] = useState({ status: false, message: '', success: false });

  useEffect(() => {
    fillSelectOptions();
  }, [props.formFields, props.open]);

  const fillSelectOptions = () => {
    const options = categoryList.map((el) => {
      return {
        value: el.id,
        label: el.name,
      };
    });

    let formattedFields = [...fields];

    formattedFields = formattedFields.map((field) => {
      if (field.options) field.options = options;
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
  };

  const generateInitialValues = () => {
    let initialValues = {};

    if (props.editItem) {
      fields.forEach((field) => {
        initialValues[field.name] = props.editItem[field.name];
      });
      initialValues['id'] = props.editItem.id;
    } else {
      fields.forEach((field) => {
        initialValues[field.name] = '';
      });
    }

    return initialValues;
  };

  const handleSubmit = async (values) => {
    const tmp = props.permissions.filter((el) => el.checked == true);
    const permissions = [];
    tmp.map((el) => permissions.push(el.id));
    const action = props.editItem ? props.update : props.create;

    let response = {};
    if (props.user) {
      if (props.editItem) {
        let id = values.id;
        delete values.id;
        response = await action(id, {
          user: { ...values, clientId: 1, isFirstTimeLogin: props.editItem ? false : true },
          permissions: permissions,
        });
      } else {
        response = await action({
          user: { ...values, clientId: 1, isFirstTimeLogin: props.editItem ? false : true },
          permissions: permissions,
        });
      }
    } else {
      response = await action({
        ...values,
      });
    }

    if (response.statusCode === 200) {
      setOpenSnackBar({ status: true, message: response.message, success: true });
      props.setOpenSideBar(false);
      props.setPermissions(
        props.permissions.map((el) => {
          return { ...el, checked: false };
        }),
      );
      return;
    }

    const resJson = await response.json();
    setOpenSnackBar({ status: true, message: resJson.message, success: false });
  };

  const handleCheck = (id) => {
    props.setPermissions((prev) => {
      let index = prev.findIndex((item) => item.id === id);
      prev[index].checked = !prev[index].checked;
      return [...prev];
    });
  };

  return (
    <>
      <SnackbarComponent
        message={openSnackBar.message}
        open={openSnackBar.status}
        handleSnackBarClose={handleSnackBarClose}
        severity={openSnackBar.success ? 'success' : 'error'}
      />

      <Drawer anchor="left" open={props.open} onClose={toggleDrawer('left', !props.open)}>
        <Formik
          initialValues={generateInitialValues()}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form className={classes.formContainer}>
            <FormRender formFields={fields} />
            {props.user && (
              <>
                {props.permissions.map((permission) => {
                  return (
                    <BootstrapCheckbox
                      key={permission.id}
                      label={permission.name}
                      checked={permission.checked}
                      handleCheck={() => handleCheck(permission.id)}
                    />
                  );
                })}
              </>
            )}
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
