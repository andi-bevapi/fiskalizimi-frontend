import TableComponent from '../../components/Table';
import { listFormat } from '../../helpers/listFormater';
import { useSellingUnitContext } from '../../Context/SellingUnitContext';
import { formFields, validationSchema } from './formFields';
import { useTranslation } from "react-i18next";

const tableHeaders = ['id', 'name'];

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
  const {t} = useTranslation();

  return (
    <TableComponent
      title={t("sellingUnitList")}
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
