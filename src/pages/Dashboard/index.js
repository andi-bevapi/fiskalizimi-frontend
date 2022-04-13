import { CategoryProvider } from "../../Context/CategoryContext";
import { SellingUnitProvider } from "../../Context/SellingUnitContext";
import { SupplierProvider } from "../../Context/SuppliersContext";
import DashboardHeader from "./DashboardHeader";
import Compose from '../../components/Compose';

export default () => {
  return (
    <Compose components={[CategoryProvider, SellingUnitProvider, SupplierProvider]}>
      <DashboardHeader />
    </Compose>
  );
};