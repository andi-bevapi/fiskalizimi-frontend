import { useTranslation } from 'react-i18next';
import { Drawer } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import FormRender from '../FormRender';
import SnackbarComponent from '../Snackbar';
import SaveIcon from '@mui/icons-material/Save';
import BootstrapCheckbox from '../InputFields/BootsrapCheckbox';
import { isFile } from '../../helpers/isFile';
import { useModel } from 'umi';
import { useConfigProvider } from '../../Context/ConfigurationsContext';

const useStyles = makeStyles(() => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 30,
    width: 260,
  },
}));

const SidebarAction = (props) => {
  const { initialState, refresh } = useModel('@@initialState');
  const { config } = useConfigProvider();
  const classes = useStyles();
  const { t } = useTranslation();

  const [fields, setFields] = useState(props.formFields);
  const [openSnackBar, setOpenSnackBar] = useState({ status: false, message: '', success: false });
  const [vatValue , setVatValue] = useState(0);

  useEffect(() => {
    fillSelectOptions();
    if (props.user) {
      fillPermissions();
    }
  }, [props.formFields, props.open]);

  const fillPermissions = () => {
    if (props.editItem) {
      props.editItem.permissions.map((permission) => {
        props.setPermissions((prev) => {
          let index = prev.findIndex((item) => item.id === permission.id);
          prev[index].checked = true;
          return [...prev];
        });
      });
    } else {
      Object.keys(props.permissions).map((key, idx) => {
        props.permissions[key].permissions.map((el) => {
          el.checked = false;
        });
      });
    }
  };

  const fillSelectOptions = () => {
    if (!props.contexts) return;

    Object.keys(props.contexts).map((context) => {
      const options = props.contexts[context].map((el) => {
        return {
          value: el.id,
          label: el.name,
        };
      });

      let formattedFields = [...fields];

      formattedFields = formattedFields.map((field) => {
        if (field?.options?.length === 0 && field.identifier === context) field.options = options;
        return field;
      });

      setFields(formattedFields);
    });
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
      if (props.user) {
        initialValues['password'] = '';
      }
    } else {
      fields.forEach((field) => {
        initialValues[field.name] = '';
        if (field.component === 'Checkbox') initialValues[field.name] = false;
        if (field.component === 'Date') initialValues[field.name] = new Date();
        if (field.name == 'vat') {
          let option = field.options.filter((el) => el.value == field.defaultValue)
          initialValues[field.name] = option[0].value;
        }
      });
    }
    return initialValues;
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleSubmit = (values) => {
    let file,
      fileKeyName = null;

    Object.entries(values).map((item) => {
      if (isFile(item[1])) {
        file = item[1];
        fileKeyName = item[0];
      }
    });

    if (file) {
      getBase64(file).then((result) => {
        values[fileKeyName] = result;
        postData(values);
      });
      return;
    }

    postData(values);
  };

  const postData = async (values) => {
    const permissions = [];
    if (props.user) {
      Object.keys(props.permissions).map((key, idx) => {
        const tmp = props.permissions[key].permissions.filter((el) => el.checked == true);
        tmp.map((el) => permissions.push(el.id));
      });
    }

    const action = props.editItem ? props.update : props.create;

    let response = {};
    if (props.product && values.price === 0 && config.allowSellsWithZero === false) {
      setOpenSnackBar({ status: true, message: t('zeroPrice'), success: false });
      return;
    }
    if (props.user) {
      if (props.editItem) {
        let id = values.id;
        delete values.id;
        response = await action(id, {
          user: {
            ...values,
            clientId: initialState?.currentUser?.clientId,
            isFirstTimeLogin: !props.editItem,
          },
          permissions: permissions,
        });
        refresh();
      } else {
        response = await action({
          user: {
            ...values,
            clientId: initialState?.currentUser?.clientId,
            isFirstTimeLogin: !props.editItem,
          },
          permissions: permissions,
        });
        refresh();
      }
    } else {
      response = await action({
        ...values,
      });
    }

    if (response?.statusCode === 200) {
      setOpenSnackBar({ status: true, message: response.message, success: true });
      props.setOpenSideBar(false);
      if (props.user) {
        refresh();
        Object.keys(props.permissions).map((key, idx) => {
          props.permissions[key].permissions.map((el) => {
            el.checked = false;
          });
        });
      }
      return;
    }

    const resJson = await response.json();
    setOpenSnackBar({ status: true, message: resJson.message, success: false });
  };

  const handleCheck = (id) => {
    props.setPermissions((prev) => {
      let index = prev.findIndex((item) => item.id === id);
      let entity = prev[index].name.split('.')[1];
      if (prev[index].label != t('view')) {
        if (prev[index].checked == false) {
          let indexView = prev.findIndex((item) => item.name === `permission.${entity}.view`);
          if (prev[indexView].checked == false) prev[indexView].checked = true;
        }
      } else {
        if (prev[index].checked == true) {
          let entityPermissions = prev.filter((item) => item.name.includes(`permission.${entity}`));
          entityPermissions.map((el) => {
            if (el.label != t('view')) {
              let indexPermission = prev.findIndex((item) => item.id === el.id);
              prev[indexPermission].checked = false;
            }
          });
        }
      }
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
          enableReinitialize={true}
          validationSchema={props.validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched ,isValid }) => {
            {errors.vat && props.product ? setVatValue(2) : setVatValue(0)}
            return (
              <Form className={classes.formContainer}>
                <FormRender formFields={fields} vatDefault={vatValue} editProduct={props.editItem ? true : false} disableField={!props.editItem && props.arka ? false: true} />
                {props.user && (
                  <>
                    {Object.keys(props.permissions).map((key, idx) => {
                      return (
                        <>
                          <p>{key.toUpperCase()}</p>
                          {props.permissions[key].permissions.map((permission) => {
                            return (
                              <BootstrapCheckbox
                                key={permission.id}
                                label={permission.label}
                                checked={permission.checked}
                                handleCheck={() => handleCheck(permission.id)}
                              />
                            );
                          })}
                        </>
                      );
                    })}
                  </>
                )}
                <Button variant="contained" type="submit" disabled={!isValid}>
                  <SaveIcon style={{ marginRight: 10 }} /> {t('save')}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Drawer>
    </>
  );
};

export default SidebarAction;
