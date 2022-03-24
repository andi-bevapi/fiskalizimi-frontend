import TableComponent from '../../components/Table';
import { listFormat } from "../../helpers/listFormater";
import formFields from './formFields';
import { useBranchListContext } from "../../Context/BranchListContext";

const tableHeaders = ['Id', 'Name', "Address", "City", "BusinessUnitCode", "MaintainerCode", "Code", 'Actions'];

const BranchList = () => {
  const { branchList, setBranchList, isLoading, branchListToCreate, branchListToUpdate, branchListToDelete } = useBranchListContext();
  const formatedBranchList = listFormat(branchList, tableHeaders);

  return (
    <TableComponent
      title="Lista e Pikave"
      tableHeaders={tableHeaders}
      fullList={branchList}
      data={formatedBranchList}
      setData={setBranchList}
      create={branchListToCreate}
      update={branchListToUpdate}
      delete={branchListToDelete}
      formFields={formFields}
      isLoading={isLoading}
    />
  );
}

export default BranchList;