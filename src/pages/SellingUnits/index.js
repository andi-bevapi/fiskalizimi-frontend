import TableComponent from '../../components/Table';
import { useState, useEffect } from 'react';
import { getSellingUnits } from '../../services/sellingUnit';

const tableHeaders = ['Nr.', 'Name', 'Actions'];

const SellingUnits = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'kg',
    },
    {
      id: 2,
      name: 'cope',
    },
    {
      id: 3,
      name: 'liter',
    },
  ]);

  const [element, setElement] = useState({ id: 0 });

  useEffect(() => {
    const getSellingUnitsList = async() => {
      const response = await getSellingUnits();
      if (response.statusCode == 200) {
        setData(response.data);
      }
      console.log(response);
    }
    getSellingUnitsList();
  }, []);
  
  const handleEditProduct = () => {
    console.log(element);
    const changedProduct = data.filter((el) => el.id == element.id);
    console.log(changedProduct[0]);
    setElement({ id: 0 });
  };

  const handleAsk = (id) => {
    console.log(id);
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
