import TableComponent from '../../components/Table';
import { listFormat } from "../../helpers/listFormater";
import { useSupplierContext } from "../../Context/SuppliersContext";
import { formFields, validationSchema } from './formFields';

const tableHeaders = ['Id', 'Name', 'Actions'];

const Suppliers = () => {
  const { suppliersList,
    setSuppliersList,
    supplierToCreate,
    supplierToUpdate,
    supplierToDelete,
    isLoading, } = useSupplierContext();

  const formatedProducts = listFormat(suppliersList, tableHeaders);

  return (
    <TableComponent
      title="Lista e Furnitoreve"
      tableHeaders={tableHeaders}
      fullList={suppliersList}
      data={formatedProducts}
      setData={setSuppliersList}
      create={supplierToCreate}
      update={supplierToUpdate}
      delete={supplierToDelete}
      formFields={formFields}
      validationSchema={validationSchema}
      isLoading={isLoading}
    />
  );
};

export default Suppliers;