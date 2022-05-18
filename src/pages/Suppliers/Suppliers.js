import TableComponent from '../../components/Table';
import { listFormat } from "../../helpers/listFormater";
import { useSupplierContext } from "../../Context/SuppliersContext";
import { useBranchListContext } from "../../Context/BranchListContext";
import { formFields, validationSchema } from './formFields';
import { useTranslation } from "react-i18next";

const tableHeaders = ['id', 'name'];

const Suppliers = () => {
  const { suppliersList,
    setSuppliersList,
    supplierToCreate,
    supplierToUpdate,
    supplierToDelete,
    isLoading, } = useSupplierContext();

  const formatedProducts = listFormat(suppliersList, tableHeaders);
  const { branchList } = useBranchListContext();
  const {t} = useTranslation();

  return (
    <TableComponent
      title={t("supplierList")}
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
      contexts={{
        branchList,
      }}
      acceses={{
        create: 'canCreateSupplier',
        update: 'canUpdateSupplier',
        delete: 'canDeleteSupplier'
      }}
    />
  );
};

export default Suppliers;