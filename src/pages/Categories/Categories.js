import { useState } from 'react';
import TableComponent from '../../components/Table';
import {useCategoryContext} from "../../Context/CategoryContext";
import {listFormat} from "../../helpers/listFormater";
const tableHeaders = ['Nr.', 'Name', 'Actions'];

const Categories = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'pije',
    },
    {
      id: 2,
      name: 'perime',
    },
    {
      id: 3,
      name: 'fruta',
    },
  ]);
  const [element, setElement] = useState({ id: 0 });
  const {categoryList ,setCategoryList} = useCategoryContext();
  const formatedProducts = listFormat(categoryList,tableHeaders);
  console.log("formatedProducts------",formatedProducts);

  const handleEditCategory = () => {
    category.filter((el) => el.id == element.id);
    setElement({id: 0});
  };

  const handleAsk = (id) => {
    console.log(id);
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