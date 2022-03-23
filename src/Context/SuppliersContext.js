import { createContext, useContext, useState, useEffect } from 'react';
import { getSuppliersList, createSupplier } from '../services/suppliers';

const SupplierContext = createContext({});

const SupplierProvider = (props) => {
  const [suppliersList, setSuppliersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    getSuppliers();
  }, []);

  const getSuppliers = async () => {
    setIsLoading(true);
    try {
      const response = await getSuppliersList();
      if (response.statusCode === 200) {
        setSuppliersList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const supplierToCreate = async (data) => {
      console.log("Supplier to create", data);
    try {
      const response = await createSupplier(data);
      console.log(response);
      getSuppliers();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const supplierToUpdate = async (data) => {
    // try {
    //   const result = await updateCategory(data);
    //   getCategoryList();
    //   return result;
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const supplierToDelete = async (id) => {
    // try {
    //   setCategoryList((prevState) => {
    //     const newState = prevState.filter((el) => el.id !== id);
    //     return [...newState];
    //   });
    //   const result = await deleteCategory(id);
    //   return result;
    // } catch (error) {
    //   console.log(error);
    // }
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
