import { createContext, useContext, useEffect, useState } from 'react';
import { useModel } from 'umi';
import {
  getAllArka,
  createNewArka,
  deleteArka,
  updateArka,
  getArkaHistory,
  getAllArkabyClientId
} from '../services/arka';

const ArkaContext = createContext({});

const ArkaProvider = (props) => {
  const { initialState } = useModel('@@initialState');
  const [isLoading, setIsLoading] = useState(false);
  const [arkaList, setArkaList] = useState([]);

  const getArka = async () => {
    setIsLoading(true);
    try {
      let response = [];
      if (initialState?.currentUser?.branchId !== 0)
         response = await getAllArka(initialState?.currentUser?.branchId);
      else response = await getAllArkabyClientId(initialState?.currentUser?.clientId)
      if (response.statusCode === 200) setArkaList(response.data);
    } catch (error) {
      return error;
    }
    setIsLoading(false);
  };

  const createArka = async (body) => {
    try {
      const response = await createNewArka(initialState?.currentUser?.clientId, body);
      if (response.statusCode === 200) {
        setArkaList((prevState) => {
          return [...prevState, response.data];
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  };

  const arkaToUpdate = async (data) => {
    try {
      const response = await updateArka(data);
      if (response.statusCode === 200) {
        setArkaList((prevState) => {
          const index = prevState.findIndex((item) => item.id === data.id);
          prevState[index] = data;
          return [...prevState];
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  };
  const arkaToDelete = async (id) => {
    try {
      const response = await deleteArka(id);
      if (response.statusCode === 200) {
        setArkaList((prevState) => {
          const newState = prevState.filter((el) => el.id !== id);
          return [...newState];
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  };

  const viewArkaHistory = async (id) => {
    try {
      const response = await getArkaHistory(id);
      return response;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getArka();
  }, [initialState?.currentUser]);

  const values = {
    arkaList,
    setArkaList,
    isLoading,
    createArka,
    arkaToUpdate,
    arkaToDelete,
    viewArkaHistory,
  };

  return <ArkaContext.Provider value={values}>{props.children}</ArkaContext.Provider>;
};

const useContextArka = () => {
  return useContext(ArkaContext);
};

export { ArkaProvider, useContextArka };
