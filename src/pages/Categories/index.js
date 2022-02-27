import { useState } from 'react';
import TableComponent from '../../components/Table';

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

  const handleEditCategory = () => {
    console.log(element);
    const changedCategory = data.filter((el) => el.id == element.id);
    console.log(changedCategory[0]);
  };

  const handleAsk = (id) => {
    console.log(id);
  };

  return (
    <>
      <h1>Categories Component</h1>
      <TableComponent
        tableHeaders={tableHeaders}
        data={data}
        setData={setData}
        element={element}
        setElement={setElement}
        handleEditElement={handleEditCategory}
        handleAsk={handleAsk}
      />
    </>
  );
};

export default Categories;
