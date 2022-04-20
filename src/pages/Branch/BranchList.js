import TableComponent from '../../components/Table';
import { listFormat } from "../../helpers/listFormater";
import { formFields, validationSchema } from './formFields';
import { useBranchListContext } from "../../Context/BranchListContext";
import { useTranslation } from "react-i18next";

const tableHeaders = ['Id', 'Name', "Address", "City", "BusinessUnitCode", "MaintainerCode", "Code", 'Actions'];

const BranchList = () => {
  const { branchList, setBranchList, isLoading, branchListToCreate, branchListToUpdate, branchListToDelete } = useBranchListContext();
  const formatedBranchList = listFormat(branchList, tableHeaders);
  const {t} = useTranslation();

  return (
    <TableComponent
      title={t("branchList")}
      tableHeaders={tableHeaders}
      fullList={branchList}
      data={formatedBranchList}
      setData={setBranchList}
      create={branchListToCreate}
      update={branchListToUpdate}
      delete={branchListToDelete}
      formFields={formFields}
      validationSchema={validationSchema}
      isLoading={isLoading}
      acceses={{
        create: 'canCreateBranch',
        update: 'canUpdateBranch',
        delete: 'canDeleteBranch'
      }}
    />
  );
}

export default BranchList;