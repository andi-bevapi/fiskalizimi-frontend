import { createContext, useContext, useState, useEffect } from 'react';
import {
  getSellingUnits,
  createSellingUnit,
  updateSellingUnit,
  deleteSellingUnit,
  getSellingUnitsByClientId,
} from '../services/sellingUnit';
import { useModel } from 'umi';
import { getClientId } from '../helpers/getClientId';

const SellingUnitContext = createContext({});

const SellingUnitProvider = (props) => {
  const { initialState } = useModel('@@initialState');

  const [sellingUnitList, setSellingUnitList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    getSellingUnitList();
  }, [initialState?.currentUser]);

  const getSellingUnitList = async () => {
    setIsLoading(true);
    try {
      let response = [];
      if (initialState?.currentUser?.branchId !== 0)
        response = await getSellingUnits(initialState?.currentUser?.branchId);
      else response = await getSellingUnitsByClientId(getClientId(initialState?.currentUser));
      if (response.statusCode === 200) {
        setSellingUnitList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const sellingUnitToCreate = async (data) => {
    try {
      const response = await createSellingUnit(getClientId(initialState?.currentUser), data);
      getSellingUnitList();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const sellingUnitToUpdate = async (data) => {
    try {
      const response = await updateSellingUnit(initialState?.currentUser?.branchId, data);
      getSellingUnitList();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const sellingUnitToDelete = async (id) => {
    try {
      const response = await deleteSellingUnit(id);
      setSellingUnitList((prevState) => {
        const list = prevState.filter((item) => item.id != id);
        return [...list];
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    sellingUnitList,
    setSellingUnitList,
    sellingUnitToCreate,
    sellingUnitToUpdate,
    sellingUnitToDelete,
    isLoading,
  };

  return <SellingUnitContext.Provider value={values}>{props.children}</SellingUnitContext.Provider>;
};
const useSellingUnitContext = () => {
  return useContext(SellingUnitContext);
};

export { SellingUnitProvider, useSellingUnitContext };
