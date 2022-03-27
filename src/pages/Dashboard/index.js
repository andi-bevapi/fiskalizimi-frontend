import { ProductProvider } from "../../Context/ProductContext";
import { CategoryProvider } from "../../Context/CategoryContext";
import DashboardHeader from "./DashboardHeader";

export default () => {
  return (
    <ProductProvider>
      <CategoryProvider>
        <DashboardHeader />
      </CategoryProvider>
    </ProductProvider>
  );
};