import { createContext, useContext, useEffect, useState } from 'react';

import { getUsers } from '../services/user/index';

const UserContext = createContext({});

const UserProvider = (props) => {
  const [users, setUsers] = useState([]);

  const getUsersList = async () => {
    try {
      //HERE!!! get user's client id
      const response = await getUsers(1);
      if (response.statusCode === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    getUsersList();
  }, []);

  const values = { users, setUsers };

  return <UserContext.Provider value={values}>{props.children}</UserContext.Provider>;
};

const useContextUser = () => {
  return useContext(UserContext);
};

export { UserProvider, useContextUser };
