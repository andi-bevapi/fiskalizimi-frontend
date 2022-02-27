import TableComponent from '../../components/Table';
import { useState } from 'react';

const tableHeaders = ['Nr.', 'Image', 'Barcode', 'Name', 'Price', 'Stock', 'Category', 'Actions'];

const Products = () => {
  const [data, setData] = useState([
    {
      id: 1,
      image: 'foto',
      barcode: '81767',
      name: 'vodka',
      price: '100',
      stock: '10',
      category: 'pije',
    },
    {
      id: 2,
      image: 'foto',
      barcode: '817s367',
      name: 'uje',
      price: '100',
      stock: '10',
      category: 'pije',
    },
    {
      id: 3,
      image: 'foto',
      barcode: '817',
      name: 'birra',
      price: '100',
      stock: '10',
      category: 'pije',
    },
  ]);

  const [element, setElement] = useState({ id: 0 });

  const handleEditProduct = () => {
    console.log(element);
    const changedProduct = data.filter((el) => el.id == element.id);
    console.log(changedProduct[0]);
    setElement({id: 0});
  };

  const handleAsk = (id) => {
    console.log(id);
  };

  return (
    <>
      <h1>Products Component</h1>
      <TableComponent
        tableHeaders={tableHeaders}
        data={data}
        setData={setData}
        element={element}
        setElement={setElement}
        handleEditElement={handleEditProduct}
        handleAsk={handleAsk}
      />
    </>
  );
};

export default Products;
