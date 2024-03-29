import { createContext, useContext, useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser, getUsersByClientId } from '../services/user/index';
import { getPermissions } from '../services/permission';
import { useModel } from 'umi';
import { getClientId } from '../helpers/getClientId';

const UsersListContext = createContext({});

const UsersListProvider = (props) => {
  const { initialState } = useModel('@@initialState');

  const [usersList, setUsersList] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsersList = async () => {
    setIsLoading(true);
    try {
      let response = [];
      if (initialState.currentUser?.branchId !== 0)
        response = await getUsers(initialState?.currentUser?.branchId);
      else response = await getUsersByClientId(getClientId(initialState?.currentUser))
      if (response.statusCode === 200) {
        setUsersList(response.data);
      }
    } catch (error) {
      return error;
    }
    setIsLoading(false);
  };

  const getPermissionsList = async () => {
    try {
      const response = await getPermissions();
      if (response.statusCode === 200) {
        setPermissions(
          response.data.map((el) => {
            return { ...el, checked: false };
          }),
        );
      }
    } catch (error) {
      return error;
    }
  };

  const userToCreate = async (data) => {
    try {
      const response = await createUser(data);
      getUsersList();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const userToUpdate = async (id, data) => {
    try {
      const response = await updateUser(id, data);
      getUsersList();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const userToDelete = async (id) => {
    try {
      const response = await deleteUser(id);
      setUsersList((prevState) => {
        const list = prevState.filter((el) => el.id !== id);
        return [...list];
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersList();
    getPermissionsList();
  }, [initialState?.currentUser]);

  const values = {
    usersList,
    setUsersList,
    userToCreate,
    userToUpdate,
    userToDelete,
    isLoading,
    permissions,
    setPermissions,
  };

  return <UsersListContext.Provider value={values}>{props.children}</UsersListContext.Provider>;
};

const useUsersListContext = () => {
  return useContext(UsersListContext);
};

export { UsersListProvider, useUsersListContext };
