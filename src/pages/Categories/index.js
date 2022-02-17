import TableComponent from '../../components/Table';
import { useState } from 'react';

const Categories = () => {
  const tableHeaders = ['Nr.', 'Name', 'Actions'];
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
    <div>
      <h1>Categories Component</h1>
      <TableComponent
        tableHeaders={tableHeaders}
        data={data}
        setData={setData}
        element={element}
        setElement={setElement}
        handleEditElement={handleEditCategory}
        handleAsk={handleAsk}
      ></TableComponent>
    </div>
  );
};

export default Categories;
