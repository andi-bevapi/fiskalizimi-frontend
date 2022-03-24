import TableComponent from '../../components/Table';
import { listFormat } from '../../helpers/listFormater';
import { useSellingUnitContext } from '../../Context/SellingUnitContext';
import formFields from './formFields';

const tableHeaders = ['Id', 'Name', 'Actions'];

const SellingUnits = () => {
  const {
    sellingUnitList,
    setSellingUnitList,
    sellingUnitToCreate,
    sellingUnitToUpdate,
    sellingUnitToDelete,
    isLoading,
  } = useSellingUnitContext();

  const formatedProducts = listFormat(sellingUnitList, tableHeaders);

  return (
    <TableComponent
      title="Lista e Njesive te shitjes"
      tableHeaders={tableHeaders}
      fullList={sellingUnitList}
      data={formatedProducts}
      setData={setSellingUnitList}
      create={sellingUnitToCreate}
      update={sellingUnitToUpdate}
      delete={sellingUnitToDelete}
      formFields={formFields}
      isLoading={isLoading}
    />
  );
};

export default SellingUnits;
