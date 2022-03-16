import {ProductProvider} from "../../Context/ProductContext"
import Products from "./Products";

import {CategoryProvider} from "../../Context/CategoryContext";

export default () => {

  return (
    <ProductProvider>
        <CategoryProvider>
            <Products/>
        </CategoryProvider>
    </ProductProvider>
  );
};