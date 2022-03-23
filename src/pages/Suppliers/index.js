import {SupplierProvider} from "../../Context/SuppliersContext"
import Suppliers from "./Suppliers";

import {CategoryProvider} from "../../Context/CategoryContext";

export default () => {

  return (
    <SupplierProvider>
        <CategoryProvider>
            <Suppliers/>
        </CategoryProvider>
    </SupplierProvider>
  );
};