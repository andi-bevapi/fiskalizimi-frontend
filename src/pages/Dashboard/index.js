import { ProductProvider } from "../../Context/ProductContext";
import { CategoryProvider } from "../../Context/CategoryContext";
import DashboardHeader from "./DashboardHeader";
import Compose from '../../components/Compose';

export default () => {
  return (
    <Compose components={[ProductProvider, CategoryProvider]}>
      <DashboardHeader />
    </Compose>
  );
};