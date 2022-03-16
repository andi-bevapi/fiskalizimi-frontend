import TableComponent from '../../components/Table';
import { useState, useEffect } from 'react';
import { getSellingUnits } from '../../services/sellingUnit';

const tableHeaders = ['Nr.', 'Name', 'Actions'];

const SellingUnits = () => {
  const [data, setData] = useState([]);

  const [element, setElement] = useState({ id: 0 });

  useEffect(() => {
    const getSellingUnitsList = async () => {
      const response = await getSellingUnits();
      if (response.statusCode == 200) {
        setData(response.data);
      }
    };
    getSellingUnitsList();
  }, []);

  const handleEditProduct = () => {
    const changedProduct = data.filter((el) => el.id == element.id);
    setElement({ id: 0 });
  };

  const handleAsk = (id) => {
  };

  return (
    <>
      <h1>SellingUnits Component</h1>
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

export default SellingUnits;
