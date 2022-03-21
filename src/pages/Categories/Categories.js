import { useState , useEffect } from 'react';
import TableComponent from '../../components/Table';
import {useCategoryContext} from "../../Context/CategoryContext";
import {listFormat} from "../../helpers/listFormater";
import SnackbarComponent from "../../components/Snackbar/index";
const tableHeaders = ['ID', 'Name', 'Actions'];

const Categories = () => {

  const [element, setElement] = useState({ id: 0 });
  const {categoryList,categoryToUpdate ,categoryToDelete,snackBarStatus} = useCategoryContext();
  const [categoryData,setCategoryData] = useState([]);
  const [openStatus,setOpenStatus] = useState(false);

  useEffect(()=>{
    if(categoryList.length !== 0) {
      const tmp  = listFormat(categoryList,tableHeaders);
      setCategoryData(tmp);
      setOpenStatus(false);
    } else{
      setOpenStatus(true);
    }
  },[categoryList]);

  const handleEditCategory = () => {
    const toUpdate = categoryList.filter((el) => el.id == element.id);
    categoryToUpdate(toUpdate[0]);
    setElement({id: 0});
  };

  const handleAsk = (id) => {
    categoryToDelete(id);
  };

  return (
    <>
      {/* <h1>Categories Component</h1>
      <SnackbarComponent open={openStatus} message={snackBarStatus.message} severity={"warning"}/>
        <TableComponent
        from={"category"}
        tableHeaders={tableHeaders}
        data={categoryData}
        setData={setCategoryData}
        element={element}
        setElement={setElement}
        handleEditElement={handleEditCategory}
        handleAsk={handleAsk}
        /> */}
    </>
  );
};

export default Categories;