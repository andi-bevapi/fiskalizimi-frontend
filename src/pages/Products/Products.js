import TableComponent from '../../components/Table';
import { useState } from 'react';
import { listFormat } from "../../helpers/listFormater";
import { useContextProduct } from "../../Context/ProductContext";
import { useCategoryContext } from "../../Context/CategoryContext";

const tableHeaders = ["Id",'Name', 'Price', 'Barcode', 'Stock', 'imageVirtualPath', 'Category'];

const Products = () => {
 
  const { productList , setProductList } = useContextProduct();
  const { categoryList, setCategoryList } = useCategoryContext()
  const formatedProducts = listFormat(productList,tableHeaders);

  // console.log("formatedProducts-------",formatedProducts)
  return (
    <>
      <h1>Products Component</h1>
      <TableComponent
        tableHeaders={tableHeaders}
        data={formatedProducts}
        setData={setProductList}
        categories={categoryList}
      />
    </>
  );
};

export default Products;