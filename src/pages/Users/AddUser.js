import { React, useState, useEffect } from 'react';
import { Divider, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import styles from './AddUser.module.css';
import BootstrapInputField from '../../components/InputFields/BootstrapTextField';
import BootstrapCheckbox from '../../components/InputFields/BootsrapCheckbox';
import BootstrapSelecter from '../../components/InputFields/BootstrapSelectField';


const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: ' #5d9cec',
    color: 'white',
    borderRadius: '3px',
    boxShadow: 'none',
    textTransform: 'none',
    width: '100%',
    margin: '20px 0 30px 0',
  },
  label: {
    fontFamily: '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: '18px',
    fontWeight: '500',
    color: '#505458',
    marginTop: '20px',
  },
  chooseBtn: {
    backgroundColor: ' #5d9cec',
    color: 'white',
    borderRadius: '3px',
    boxShadow: 'none',
    textTransform: 'none',
    height: '30px',
  },
}));

const UserForm = (props) => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [branches, setBranches] = useState([
    { id: 1, label: 'Branch 1' },
    { id: 2, label: 'Branch 2' },
  ]);
//   const branches= [    { id: 1, label: 'Branch 1' },
//   { id: 2, label: 'Branch 2' },
// ];
  const [branch, setBranch] = useState('Branch 1');
  const [labelList, setLabelList] = useState([
    { id: 1, label: 'manageProducts', checked: false },
    { id: 2, label: 'manageCategories', checked: false },
    { id: 3, label: 'manageTransactions', checked: false },
    { id: 4, label: 'manageUsers', checked: false },
    { id: 5, label: 'manageSettings', checked: false },
  ]);

  useEffect(() => {
    if (props.action === 'edit') {
    }
  }, [props.action, props.user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.password.value !== event.target.repeatPass.value) {
      setError(t('passwordMismatch'));
      return;
    } else setError('');

  };

  const handleEdit = (event) => {
    event.preventDefault();

  };

  const handleCheck = (id) => {
    setLabelList((prev) => {
      let index = prev.findIndex((item) => item.id === id);
      prev[index].checked = !prev[index].checked;
      return [...prev];
    });
  };

  const handleBranch= (event) => {
    setBranch(event.target.value);
  };

  // const handleClose = () => {
  //   props.handleClose();
  // };

  return (
    <>
      <div className={styles.body}>
        <Divider sx={{ border: '1px solid #e5e5e5', marginBottom: '10px' }} />
        <form
          className={styles.form}
          onSubmit={props.action === 'edit' ? handleEdit : handleSubmit}
        >
          {/* <Typography className={classes.label}>Branch</Typography> */}
          <BootstrapSelecter
            default='Select'
            category={branch}
            handleChange={handleBranch}
            categories={branches}
            width={256}
          />

          <BootstrapInputField
            required
            label="Branch"
            defaultValue={props.action === 'edit' ? props.user.username : ''}
            placeholder="Branch"
            id="branch"
          />
          <BootstrapInputField
            required
            label="Username"
            defaultValue={props.action === 'edit' ? props.user.username : ''}
            placeholder="Username"
            id="username"
          />
          <BootstrapInputField
            required
            label="Name"
            defaultValue={props.action === 'edit' ? props.user.firstName : ''}
            placeholder="Name"
            id="name"
          />
          <BootstrapInputField
            required
            label="Lastname"
            defaultValue={props.action === 'edit' ? props.user.lastName : ''}
            placeholder="Lastname"
            id="lastname"
          />
          <BootstrapInputField
            required
            label="Operator Code"
            defaultValue={props.action === 'edit' ? props.user.operatorCode : ''}
            placeholder="Operator Code"
            id="operatorCode"
          />
          <BootstrapInputField
            label="Position"
            defaultValue={props.action === 'edit' ? props.user.position : ''}
            placeholder="Position"
            id="position"
          />
          <BootstrapInputField
            label="Phone"
            defaultValue={props.action === 'edit' ? props.user.phone : ''}
            placeholder="Phone"
            id="phone"
          />
          <BootstrapInputField
            label="Email"
            defaultValue={props.action === 'edit' ? props.user.email : ''}
            placeholder="Email"
            id="email"
          />
          {props.action === 'edit' ? (
            ''
          ) : (
            <>
              <BootstrapInputField required label="Password" placeholder="Password" id="password" />
              <BootstrapInputField
                required
                label="Repeat Password"
                placeholder="Repeat Password"
                id="repeatPass"
              />
            </>
          )}
          {error === '' ? (
            ''
          ) : (
            <div>
              <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>
            </div>
          )}
          <Typography className={classes.label}>Rights</Typography>
          <Divider className={classes.divider} style={{ margin: '20px 0 10px 0' }} />
          {labelList.map((element) => (
            <BootstrapCheckbox
              key={element.id}
              label={element.label}
              checked={element.checked}
              handleCheck={() => handleCheck(element.id)}
            />
          ))}
          <Button className={classes.btn} variant="contained" type="submit">
            {props.action === 'edit' ? 'save Changes' : 'add User'}
          </Button>
        </form>
      </div>
    </>
  );
};

export default UserForm;
