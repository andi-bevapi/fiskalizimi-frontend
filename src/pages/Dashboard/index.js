import { ProductProvider } from "../../Context/ProductContext";
import { CategoryProvider } from "../../Context/CategoryContext";
import { InvoiceProvider } from "../../Context/InvoiceContext";
import DashboardHeader from "./DashboardHeader";

export default () => {
  return (
    <ProductProvider>
      <CategoryProvider>
        <InvoiceProvider>
          <DashboardHeader />
        </InvoiceProvider>
      </CategoryProvider>
    </ProductProvider>
  );
};