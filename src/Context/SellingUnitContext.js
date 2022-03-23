import { createContext, useContext, useState, useEffect } from 'react';
import {
  getSellingUnits,
  createSellingUnit,
  updateSellingUnit,
  deleteSellingUnit,
} from '../services/sellingUnit';

const SellingUnitContext = createContext({});

const SellingUnitProvider = (props) => {
  const [sellingUnitList, setSellingUnitList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    getSellingUnitList();
  }, []);

  const getSellingUnitList = async () => {
    setIsLoading(true);
    try {
      const response = await getSellingUnits();
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
      const response = await createSellingUnit(data);
      getSellingUnitList();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const sellingUnitToUpdate = async (data) => {
    try {
      const response = await updateSellingUnit(data);
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
