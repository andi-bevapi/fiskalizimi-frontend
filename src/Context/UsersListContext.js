import { createContext, useContext, useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/user/index';
import { getPermissions } from '../services/permission';
import { useModel } from 'umi';

const UsersListContext = createContext({});

const UsersListProvider = (props) => {
  const { initialState } = useModel('@@initialState');

  const [usersList, setUsersList] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsersList = async () => {
    setIsLoading(true);
    try {
      const response = await getUsers(initialState?.currentUser?.branchId);
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
      console.log(response);
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
    if(initialState?.currentUser?.branchId) getUsersList();
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
