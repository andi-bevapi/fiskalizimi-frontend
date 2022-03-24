import TableComponent from '../../components/Table';
import { listFormat } from "../../helpers/listFormater";
import { useContextProduct } from "../../Context/ProductContext";
import { useCategoryContext } from "../../Context/CategoryContext";
import { useBranchListContext } from "../../Context/BranchListContext";
import { useSupplierContext } from "../../Context/SuppliersContext";
import { useSellingUnitContext } from "../../Context/SellingUnitContext";
import formFields from './formFields';

const tableHeaders = ['Id', 'Name', 'Price', 'Barcode', 'Stock', 'Category', 'Actions'];

const Products = () => {
  const { productList, setProductList, productToCreate, productToUpdate, productToDelete, isLoading } = useContextProduct();
  const { categoryList } = useCategoryContext();
  const { branchList } = useBranchListContext();
  const { suppliersList } = useSupplierContext();
  const { sellingUnitList } = useSellingUnitContext();

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
      contexts={{
        categoryList,
        branchList,
        suppliersList,
        sellingUnitList
      }}
    />
  );
};

export default Products;