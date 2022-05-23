import TableComponent from '../../components/Table';
import { listFormat, permissionFormat } from '../../helpers/listFormater';
import { useUsersListContext } from '../../Context/UsersListContext';
import { useBranchListContext } from '../../Context/BranchListContext';
import { formFields, validationSchema } from './formFields';
import { useTranslation } from "react-i18next";

const tableHeaders = ['id', 'username', 'firstName', 'lastName', 'phone', 'email'];

const Users = () => {
  const {
    usersList,
    setUsersList,
    userToCreate,
    userToUpdate,
    userToDelete,
    isLoading,
    permissions,
    setPermissions,
  } = useUsersListContext();
  const { branchList } = useBranchListContext();

  const formatedUsers = listFormat(usersList, tableHeaders);
  const formatedPermissions = permissionFormat(permissions);
  const {t} = useTranslation();

  return (
    <TableComponent
      title={t("usersList")}
      tableHeaders={tableHeaders}
      fullList={usersList}
      data={formatedUsers}
      setData={setUsersList}
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
      acceses={{
        create: 'canCreateUser',
        update: 'canUpdateUser',
        delete: 'canDeleteUser'
      }}
    />
  );
};

export default Users;
