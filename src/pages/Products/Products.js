import TableComponent from '../../components/Table';
import { useState } from 'react';
import {listFormat} from "../../helpers/listFormater";
import {useContextProduct} from "../../Context/ProductContext";
const tableHeaders = ['Id','Name','Price','Barcode', 'Stock','imageVirtualPath' ,'Category'];
const Products = () => {
 
  const { productList , setProductList } = useContextProduct();
  const formatedProducts = listFormat(productList,tableHeaders);

  // console.log("formatedProducts-------",formatedProducts)
  return (
    <>
     <h1>Products Component</h1>  {/* /posicionoje majtas */}
     
      <TableComponent
        tableHeaders={tableHeaders}
        data={formatedProducts}
        setData={setProductList}
      />
    </>
  );
};

export default Products;