import { useContext, useEffect, createContext, useState } from 'react';
import { useModel } from 'umi';
import { getAllClients } from '../services/client';

const ClientContext = createContext({});

const ClientProvider = (props) => {
  const { initialState } = useModel('@@initialState');

  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getClientsList();
  }, [initialState?.currentUser]);

  const getClientsList = async () => {
    setIsLoading(true);
    try {
      const result = await getAllClients();
      if (result.statusCode === 200) {
        setClients(result.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const clientToUpdate = async (data) => {
    try {
    //   const result = await updateBranchList(initialState?.currentUser?.clientId, data);
    //   getBranchList();
    //   return result;
    } catch (error) {
      console.log(error);
    }
  };

  const clientToDelete = async (id) => {
    try {
    //   setBranchList((prevState) => {
    //     const newState = prevState.filter((el) => el.id !== id);
    //     return [...newState];
    //   });
    //   const result = await deleteBranchList(id);
    //   return result;
    } catch (error) {
      console.log(error);
    }
  };

  const clientToCreate = async (data) => {
    try {
    //   const result = await createBranchList(initialState?.currentUser?.clientId, data);
    //   getBranchList();
    //   return result;
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    clients,
    setClients,
    isLoading,
    clientToCreate,
    clientToUpdate,
    clientToDelete,
  };

  return <ClientContext.Provider value={values}>{props.children}</ClientContext.Provider>;
};

const useClientContext = () => {
  return useContext(ClientContext);
};

export { useClientContext, ClientProvider };
