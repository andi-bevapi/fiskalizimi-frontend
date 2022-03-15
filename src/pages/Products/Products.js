import TableComponent from '../../components/Table';
import { useState } from 'react';
import {listFormat} from "../../helpers/listFormater";
import {useContextProduct} from "../../Context/ProductContext";
<<<<<<< HEAD
const tableHeaders = ['Id','Name','Price','Barcode', 'Stock','imageVirtualPath' ,'Category'];
const Products = () => {
 
=======
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

>>>>>>> 32ff743070d1f2750ffb72be8f29f0ad805ac2c4
  const { productList , setProductList } = useContextProduct();
  const formatedProducts = listFormat(productList,tableHeaders);
  return (
    <>
<<<<<<< HEAD
     <h1>Products Component</h1>  {/* /posicionoje majtas */}
     
=======
    
      <h1>Products Component</h1>
>>>>>>> 32ff743070d1f2750ffb72be8f29f0ad805ac2c4
      <TableComponent
        tableHeaders={tableHeaders}
        data={formatedProducts}
        setData={setProductList}
<<<<<<< HEAD
=======
        element={element}
        setElement={setElement}
        handleEditElement={handleEditProduct}
        handleAsk={handleAsk}
>>>>>>> 32ff743070d1f2750ffb72be8f29f0ad805ac2c4
      />
    </>
  );
};

export default Products;