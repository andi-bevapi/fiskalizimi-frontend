import TableComponent from '../../components/Table';
import { useState , useEffect } from 'react';
import { listFormat } from "../../helpers/listFormater";
import { useContextProduct } from "../../Context/ProductContext";
import { useCategoryContext } from "../../Context/CategoryContext";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
const tableHeaders = ["Id",'Name', 'Price', 'Barcode', 'Stock', 'imageVirtualPath', 'Category','branchId'];
const Products = () => {

  const { productList , setProductList , productToCreate ,productToUpdate , productToDelete } = useContextProduct();
  const { categoryList } = useCategoryContext();
  const formatedProducts = listFormat(productList,tableHeaders);
  const [openSideBar , setOpenSideBar] = useState(false);
  const [dataCreate , setDataCreate] = useState(false);


  const handleCreate = (event) =>{
    console.log("event----",event);
    setOpenSideBar(true);
    setDataCreate(true);
  }

  return (
    <>
      <h1>Products Component</h1>
      <Button variant="contained" onClick={handleCreate}>Krijo<AddIcon/> </Button>
      <TableComponent
        tableHeaders={tableHeaders}
        data={formatedProducts}
        setData={setProductList}
        update={productToUpdate}
        delete={productToDelete}
        categories={categoryList}
        openSidebarOnCreate={openSideBar}
        setOpnSideOnCreate={setOpenSideBar}
        fromCreate={dataCreate}
        setFromCreate={setDataCreate}
      />
    </>
  );
};

export default Products;