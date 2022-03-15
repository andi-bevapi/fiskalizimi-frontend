import TableComponent from '../../components/Table';
import { useState } from 'react';
import { listFormat } from "../../helpers/listFormater";
import { useContextProduct } from "../../Context/ProductContext";

const tableHeaders = ['Name', 'Price', 'Barcode', 'Stock', 'imageVirtualPath', 'Category'];

const Products = () => {
  const [element, setElement] = useState({ id: 0 });
  const { productList, setProductList } = useContextProduct();
  const formatedProducts = listFormat(productList, tableHeaders);

  const handleEditProduct = () => {
    const changedProduct = data.filter((el) => el.id == element.id);
    setElement({ id: 0 });
  };

  const handleAsk = (id) => {
  };

  return (
    <>
      <h1>Products Component</h1>
      <TableComponent
        tableHeaders={tableHeaders}
        data={formatedProducts}
        setData={setProductList}
        element={element}
        setElement={setElement}
        handleEditElement={handleEditProduct}
        handleAsk={handleAsk}
      />
    </>
  );
};

export default Products;