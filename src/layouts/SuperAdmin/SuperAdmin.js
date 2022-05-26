import React, { useEffect, useState } from 'react';
import { useClientContext } from '../../Context/ClientContext';
import TableComponent from '../../components/Table';
import { formFields, validationSchema } from './formFields';
import { listFormat } from '../../helpers/listFormater';

const tableHeaders = ['id', 'name', "address", "email", "phoneNumber", "NUIS"];

const SuperAdmin = () => {
  const { clients, setClients, isLoading, clientToCreate, clientToUpdate, clientToDelete } = useClientContext();
  const formatedClientList = listFormat(clients, tableHeaders);

  useEffect(() => {
}, [clients]);


  return (
    <TableComponent
      title="Klientet"
      tableHeaders={tableHeaders}
      fullList={clients}
      data={formatedClientList}
      setData={setClients}
      create={clientToCreate}
      update={clientToUpdate}
      delete={clientToDelete}
      formFields={formFields}
      validationSchema={validationSchema}
      isLoading={isLoading}
      client={true}
      acceses={{
        create: 'canCreateClient',
        update: 'canUpdateClient',
        delete: 'canDeleteClient'
      }}
    />
  );
};

export default SuperAdmin;
