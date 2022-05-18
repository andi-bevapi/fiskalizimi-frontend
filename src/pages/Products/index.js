import { CategoryProvider } from "../../Context/CategoryContext";
import { SupplierProvider } from "../../Context/SuppliersContext";
import { SellingUnitProvider } from "../../Context/SellingUnitContext";
import Products from "./Products";
import Compose from '../../components/Compose';

export default () => {
  return (
    <Compose components={[CategoryProvider, SupplierProvider, SellingUnitProvider]}>
      <Products />
    </Compose>
  );
};