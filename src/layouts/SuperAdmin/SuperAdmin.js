import React, { useEffect, useState } from 'react';
import { useClientContext } from '../../Context/ClientContext';
import { Grid, Button } from '@mui/material';
import { formFields, validationSchema } from './formFields';
import ClientCard from './ClientCard';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SidebarAction from '../../components/SidebarAction';
import SnackbarComponent from '../../components/Snackbar';
import { SwalModal } from '../../components/Modal/SwalModal';

const SuperAdmin = () => {
  const {
    clients,
    setClients,
    isLoading,
    clientToCreate,
    clientToUpdate,
    clientToDelete,
  } = useClientContext();

  const [openSideBar, setOpenSideBar] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState({ status: false, message: '' });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {}, [clients]);

  const handleCreate = () => {
    setOpenSideBar(true);
  };

  const handleDelete = (id) => {
    return SwalModal(
      'Deshironi ta fshini?',
      '',
      'warning',
      'JO',
      'PO',
      () => {},
      () => confirmDelete(id),
      id,
    );
  };

  const confirmDelete = async (id) => {
    const response = await clientToDelete(id);
    setOpenSnackBar({ status: true, message: response.message, severity: 'success' });
  };

  const handleEditItem = (id) => {
    setOpenSideBar(true);
    const foundItem = clients.find((item) => item.id === id);
    setEditItem(foundItem);
  };

  const handleSnackBarClose = () => {
    setOpenSnackBar({ status: false, severity: 'success' });
  };

  return (
    <div>
      <SnackbarComponent
        message={openSnackBar.message}
        open={openSnackBar.status}
        handleSnackBarClose={handleSnackBarClose}
        severity={openSnackBar.severity}
      />

      <SidebarAction
        open={openSideBar}
        setOpenSideBar={setOpenSideBar}
        formFields={formFields}
        validationSchema={validationSchema}
        create={clientToCreate}
        update={clientToUpdate}
        editItem={editItem}
        setEditItem={setEditItem}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          margin: '20px 0',
        }}
      >
        <Typography
          variant="body2"
          style={{ fontSize: '16px', fontFamily: 'Poppins, sans-serif' }}
        >
          Lista e Klienteve
        </Typography>
        <Button variant="contained" onClick={handleCreate}>
          Shto <AddIcon />
        </Button>
      </div>
      <Grid container spacing={3}>
        {clients?.map((client, index) => {
          return (
            <Grid item xs={12} sm={4} md={3} lg={3} xl={2} key={index}>
              <ClientCard
                key={index}
                client={client}
                onDelete={handleDelete}
                onEdit={handleEditItem}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default SuperAdmin;
