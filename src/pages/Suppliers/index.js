import TableComponent from '../../components/Table';
import { useState, useEffect } from 'react';
import { getSuppliersList } from '../../services/suppliers';

const tableHeaders = ['Nr.', 'Name', 'Start date', 'End date', 'Actions'];

const Suppliers = () => {
  const [data, setData] = useState([]);
  const [element, setElement] = useState({ id: 0 });

  useEffect(() => {
    const getSuppliers = async () => {
      const response = await getSuppliersList();
      if (response.statusCode == 200) {
        setData(response.data);
      }
    };

    getSuppliers();
  }, []);

  const handleEditProduct = () => {
    const changedProduct = data.filter((el) => el.id == element.id);
    setElement({ id: 0 });
  };

  const handleAsk = (id) => {
  };

  return (
    <>
      <h1>Suppliers Component</h1>
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

export default Suppliers;
