import { createContext, useContext, useState, useEffect } from 'react';
import {
  getSuppliersList,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliersListByClientId,
} from '../services/suppliers';
import { useModel } from 'umi';
import { getClientId } from '../helpers/getClientId';

const SupplierContext = createContext({});

const SupplierProvider = (props) => {
  const { initialState } = useModel('@@initialState');

  const [suppliersList, setSuppliersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    getSuppliers();
  }, [initialState?.currentUser]);

  const getSuppliers = async () => {
    setIsLoading(true);
    try {
      let response = [];
      if (initialState?.currentUser?.branchId !== 0)
        response = await getSuppliersList(initialState?.currentUser?.branchId);
      else response = await getSuppliersListByClientId(getClientId(initialState?.currentUser));
      if (response.statusCode === 200) {
        setSuppliersList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const supplierToCreate = async (data) => {
    try {
      const response = await createSupplier(getClientId(initialState?.currentUser), data);
      getSuppliers();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const supplierToUpdate = async (data) => {
    try {
      const response = await updateSupplier(getClientId(initialState?.currentUser), data);
      getSuppliers();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const supplierToDelete = async (id) => {
    try {
      const response = await deleteSupplier(id);
      setSuppliersList((prevState) => {
        const newState = prevState.filter((el) => el.id !== id);
        return [...newState];
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    suppliersList,
    setSuppliersList,
    supplierToCreate,
    supplierToUpdate,
    supplierToDelete,
    isLoading,
  };

  return <SupplierContext.Provider value={values}>{props.children}</SupplierContext.Provider>;
};
const useSupplierContext = () => {
  return useContext(SupplierContext);
};

export { SupplierProvider, useSupplierContext };
