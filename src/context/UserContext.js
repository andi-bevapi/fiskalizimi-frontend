import { createContext, useContext, useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/user/index';
import { getPermissions } from '../services/permission';
import { useModel } from 'umi';

const UserContext = createContext({});

const UserProvider = (props) => {
  const { initialState } = useModel('@@initialState');

  console.log(initialState)

  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsersList = async () => {
    setIsLoading(true);

    try {
      const response = await getUsers(initialState?.currentUser?.clientId);
      if (response.statusCode === 200) {
        setUsers(response.data);
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
      setUsers((prevState) => {
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
  }, []);

  const values = {
    users,
    setUsers,
    userToCreate,
    userToUpdate,
    userToDelete,
    isLoading,
    permissions,
    setPermissions,
  };

  return <UserContext.Provider value={values}>{props.children}</UserContext.Provider>;
};

const useContextUser = () => {
  return useContext(UserContext);
};

export { UserProvider, useContextUser };
