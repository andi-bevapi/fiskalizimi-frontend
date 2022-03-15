import TableComponent from '../../components/Table';
import { useState } from 'react';
import {listFormat} from "../../helpers/listFormater";
import {useContextProduct} from "../../Context/ProductContext";
const tableHeaders = ['Name','Price','Barcode', 'Stock','imageVirtualPath' ,'Category'];
const Products = () => {


  const [element, setElement] = useState({ id: 0 });

  const handleEditProduct = () => {
    console.log(element);
    const changedProduct = data.filter((el) => el.id == element.id);
    console.log("handleEditProduct-------",changedProduct[0]);
    setElement({id: 0});
  };

  const handleAsk = (id) => {
    console.log("id------",id);
  };

  const { productList , setProductList } = useContextProduct();
  const formatedProducts = listFormat(productList,tableHeaders);
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