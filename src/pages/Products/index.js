import {ProductProvider} from "../../Context/ProductContext"
import Products from "./Products";

export default () => {

  return (
    <ProductProvider>
      <Products/>
    </ProductProvider>
  );
};