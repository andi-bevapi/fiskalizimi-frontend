import { useState, useEffect } from 'react';
import TableComponent from '../../components/Table';
import { getUsers } from '../../services/user';
import { Typography } from '@mui/material/';
import SnackbarComponent from '../../components/Snackbar';
import ButtonComponent from '../../components/Button/Button';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import ModalComponent from '../../components/Modal/Modal';
import UserForm from './AddUser';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '12px',
    // font,
  },
});

const tableHeaders = ['Nr.', 'Name', 'Firstname', 'Lastname', 'Phone', 'Email', 'Actions'];

const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [snackBarMsg, setSnackBarMsg] = useState('');
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [action, setAction] = useState('');

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    //HERE!!! get user's client id
    const response = await getUsers(1);
    // console.log(response);
    if (response.statusCode == 200) {
      var tmp = [];
      for (var user of response.data) {
        tmp.push({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
        });
      }
      setUsers(tmp);
      setSnackBarMsg('Users received succesfully!');
      setOpenSnackBar(true);
    } else {
      setSnackBarMsg('There was a problem while receiving users!');
      setOpenSnackBar(true);
    }
    return;
  };

  const [element, setElement] = useState({ id: 0 });

  const handleEditCategory = () => {
    // console.log(element);
    const changedCategory = users.filter((el) => el.id == element.id);
    // console.log(changedCategory[0]);
    setElement({ id: 0 });
  };

  const handleAsk = (id) => {
    // console.log(id);
  };

  const handleUserAddOpen = () => {
    setAction('add');
    setOpenForm(true);
  };

  const handleUserEditOpen = () => {
    setAction('edit');
    setOpenForm(true);
  };

  const handleSnackBarClose = () => {
    setOpenSnackBar(false);
  };

  const handleUserFormClose = () => {
    setOpenForm(false);
  };

  return (
    <>
      <SnackbarComponent
        message={snackBarMsg}
        open={openSnackBar}
        handleSnackBarClose={handleSnackBarClose}
        severity="success"
      />
      <div className={classes.header}>
        <Typography className={classes.title}>Users</Typography>
        <ButtonComponent
          title="Add User"
          lightColor="rgba(129, 200, 104, 0.8)"
          darkColor="rgba(129, 200, 104, 1)"
          addIcon={false}
          onClick={handleUserAddOpen}
          icon={<AddIcon />}
        />
      </div>
      <TableComponent
        tableHeaders={tableHeaders}
        data={users}
        setData={setUsers}
        element={element}
        setElement={setElement}
        handleEditElement={handleEditCategory}
        handleAsk={handleAsk}
        setOpenForm={handleUserEditOpen}
      />
      <ModalComponent open={openForm} handleClose={handleUserFormClose} title="User">
        <UserForm handleClose={handleUserFormClose} action={action} user={element} />
      </ModalComponent>
    </>
  );
};

export default Users;
