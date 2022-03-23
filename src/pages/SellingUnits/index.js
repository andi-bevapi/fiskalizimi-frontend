import {SellingUnitProvider} from "../../Context/SellingUnitContext"
import SellingUnits from "./SellingUnit";

import {CategoryProvider} from "../../Context/CategoryContext";

export default () => {

  return (
    <SellingUnitProvider>
        <CategoryProvider>
            <SellingUnits/>
        </CategoryProvider>
    </SellingUnitProvider>
  );
};
