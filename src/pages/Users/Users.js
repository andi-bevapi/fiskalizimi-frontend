import TableComponent from '../../components/Table';
import { listFormat, permissionFormat } from '../../helpers/listFormater';
import { useContextUser } from '../../context/UserContext';
import { useBranchListContext } from '../../Context/BranchListContext';
import { formFields, validationSchema } from './formFields';
import { useEffect } from 'react';

const tableHeaders = ['Id', 'Username', 'Firstname', 'Lastname', 'Phone', 'Email', 'Actions'];

const Users = () => {
  const {
    users,
    setUsers,
    userToCreate,
    userToUpdate,
    userToDelete,
    isLoading,
    permissions,
    setPermissions,
  } = useContextUser();
  const { branchList } = useBranchListContext();

  const formatedUsers = listFormat(users, tableHeaders);
  const formatedPermissions = permissionFormat(permissions);

  return (
    <TableComponent
      title="Lista e Perdoruesve"
      tableHeaders={tableHeaders}
      fullList={users}
      data={formatedUsers}
      setData={setUsers}
      create={userToCreate}
      update={userToUpdate}
      delete={userToDelete}
      formFields={formFields}
      validationSchema={validationSchema}
      isLoading={isLoading}
      user={true}
      permissions={formatedPermissions}
      setPermissions={setPermissions}
      contexts={{
        branchList,
      }}
    />
  );
};

export default Users;
