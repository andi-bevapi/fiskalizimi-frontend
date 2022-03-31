import TableComponent from '../../components/Table';
import { listFormat } from '../../helpers/listFormater';
import { useSellingUnitContext } from '../../Context/SellingUnitContext';
import { formFields, validationSchema } from './formFields';

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
      title="Lista e Njesive Matese"
      tableHeaders={tableHeaders}
      fullList={sellingUnitList}
      data={formatedProducts}
      setData={setSellingUnitList}
      create={sellingUnitToCreate}
      update={sellingUnitToUpdate}
      delete={sellingUnitToDelete}
      formFields={formFields}
      validationSchema={validationSchema}
      isLoading={isLoading}
      acceses={{
        create: 'canCreateSellingUnit',
        update: 'canUpdateSellingUnit',
        delete: 'canDeleteSellingUnit'
      }}
    />
  );
};

export default SellingUnits;
