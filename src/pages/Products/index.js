import { ProductProvider } from "../../Context/ProductContext"
import { CategoryProvider } from "../../Context/CategoryContext";
import { BranchListProvider } from "../../Context/BranchListContext";
import { SupplierProvider } from "../../Context/SuppliersContext";
import { SellingUnitProvider } from "../../Context/SellingUnitContext";
import Products from "./Products";
import Compose from '../../components/Compose';

export default () => {
  return (
    <Compose components={[ProductProvider, CategoryProvider, BranchListProvider, SupplierProvider, SellingUnitProvider]}>
      <Products />
    </Compose>
  );
};