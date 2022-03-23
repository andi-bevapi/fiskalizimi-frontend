import { SellingUnitProvider } from "../../Context/SellingUnitContext"
import SellingUnits from "./SellingUnit";

export default () => {
  return (
    <SellingUnitProvider>
      <SellingUnits />
    </SellingUnitProvider>
  );
};
