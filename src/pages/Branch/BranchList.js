import TableComponent from '../../components/Table';
import { listFormat } from "../../helpers/listFormater";
import { formFields, validationSchema } from './formFields';
import { useBranchListContext } from "../../Context/BranchListContext";
import { useTranslation } from "react-i18next";

const tableHeaders = ['id', 'name', "address", "city", "businessUnitCode", "maintainerCode", "code"];

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