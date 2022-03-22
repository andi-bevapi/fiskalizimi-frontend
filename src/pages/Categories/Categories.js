import TableComponent from '../../components/Table';
import { useCategoryContext } from "../../Context/CategoryContext";
import { listFormat } from "../../helpers/listFormater";
import formFields from './formFields';

const tableHeaders = ['Id', 'Name', 'Actions'];

const Categories = () => {
  const { setCategoryList, categoryToCreate, categoryList, categoryToUpdate, categoryToDelete, isLoading } = useCategoryContext();
  const formatedCategory = listFormat(categoryList, tableHeaders);

  return (
    <TableComponent
      title="Lista e Kategorive"
      tableHeaders={tableHeaders}
      fullList={categoryList}
      data={formatedCategory}
      setData={setCategoryList}
      create={categoryToCreate}
      update={categoryToUpdate}
      delete={categoryToDelete}
      formFields={formFields}
      isLoading={isLoading}
    />
  );
};

export default Categories;