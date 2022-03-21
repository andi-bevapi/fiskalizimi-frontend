import TableComponent from '../../components/Table';
import { listFormat } from "../../helpers/listFormater";
import { useContextProduct } from "../../Context/ProductContext";
import formFields from './formFields';

const tableHeaders = ['Id', 'Name', 'Price', 'Barcode', 'Stock', 'Category', 'Actions'];

const Products = () => {
  const { productList, setProductList, productToCreate, productToUpdate, productToDelete, isLoading } = useContextProduct();

  const formatedProducts = listFormat(productList, tableHeaders);

  return (
    <TableComponent
      title="Lista e Produkteve"
      tableHeaders={tableHeaders}
      fullList={productList}
      data={formatedProducts}
      setData={setProductList}
      create={productToCreate}
      update={productToUpdate}
      delete={productToDelete}
      formFields={formFields}
      isLoading={isLoading}
    />
  );
};

export default Products;