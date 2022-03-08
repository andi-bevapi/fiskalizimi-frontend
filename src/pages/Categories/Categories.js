import { useState } from 'react';
import TableComponent from '../../components/Table';
import {useCategoryContext} from "../../Context/CategoryContext";
import {listFormat} from "../../helpers/listFormater";
const tableHeaders = ['ID', 'Name', 'Actions'];

const Categories = () => {

  const [element, setElement] = useState({ id: 0 });
  const {categoryList ,setCategoryList,categoryToUpdate ,categoryToDelete} = useCategoryContext();
  const formatedProducts = listFormat(categoryList,tableHeaders);
//   console.log("formatedProducts------",categoryList);

  const handleEditCategory = () => {
    
    const toUpdate = categoryList.filter((el) => el.id == element.id);
    // console.log("toUpdate-----",toUpdate[0]);
    categoryToUpdate(toUpdate[0]).then((result)=>{
        console.log("result----",result);
    });
    setElement({id: 0});
  };

  const handleAsk = (id) => {

    categoryToDelete(id);
    
  };

  return (
    <>
      <h1>Categories Component</h1>
      <TableComponent
        tableHeaders={tableHeaders}
        data={formatedProducts}
        setData={setCategoryList}
        element={element}
        setElement={setElement}
        handleEditElement={handleEditCategory}
        handleAsk={handleAsk}
      />
    </>
  );
};

export default Categories;