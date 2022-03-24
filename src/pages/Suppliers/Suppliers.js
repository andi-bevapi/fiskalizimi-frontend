import TableComponent from '../../components/Table';
import { listFormat } from "../../helpers/listFormater";
import { useSupplierContext } from "../../Context/SuppliersContext";
import formFields from './formFields';

const tableHeaders = ['Id', 'Name', 'StartDate', 'EndDate', 'Actions'];

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
      isLoading={isLoading}
    />
  );
};

export default Suppliers;