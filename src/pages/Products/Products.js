import TableComponent from '../../components/Table';
import { listFormat } from "../../helpers/listFormater";
import { useContextProduct } from "../../Context/ProductContext";
import { useCategoryContext } from "../../Context/CategoryContext";
import { useBranchListContext } from "../../Context/BranchListContext";
import { useSupplierContext } from "../../Context/SuppliersContext";
import { useSellingUnitContext } from "../../Context/SellingUnitContext";
import { formFields, validationSchema } from './formFields';
import { useTranslation } from "react-i18next";

const tableHeaders = ['id', 'name', 'price', 'barcode','vat' ,'stock', 'category','sellingUnit','supplier'];

const Products = () => {
  const { productList, setProductList, productToCreate, productToUpdate, productToDelete, isLoading } = useContextProduct();
  const { categoryList } = useCategoryContext();
  const { branchList } = useBranchListContext();
  const { suppliersList } = useSupplierContext();
  const { sellingUnitList } = useSellingUnitContext();
  const {t} = useTranslation();
  
  const formatedProducts = listFormat(productList, tableHeaders);

  return (
    <TableComponent
      title={t("productList")}
      tableHeaders={tableHeaders}
      fullList={productList}
      data={formatedProducts}
      setData={setProductList}
      create={productToCreate}
      update={productToUpdate}
      delete={productToDelete}
      formFields={formFields}
      product={true}
      validationSchema={validationSchema}
      isLoading={isLoading}
      contexts={{
        categoryList,
        branchList,
        suppliersList,
        sellingUnitList
      }}
      acceses={{
        create: 'canCreateProduct',
        update: 'canUpdateProduct',
        delete: 'canDeleteProduct'
      }}
    />
  );
};

export default Products;