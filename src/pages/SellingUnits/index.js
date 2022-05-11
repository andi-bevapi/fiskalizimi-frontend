import { SellingUnitProvider } from '../../Context/SellingUnitContext';
import SellingUnits from './SellingUnit';
import { BranchListProvider } from '../../Context/BranchListContext';

import { CategoryProvider } from '../../Context/CategoryContext';

export default () => {
  return (
    <BranchListProvider>
      <SellingUnitProvider>
        <CategoryProvider>
          <SellingUnits />
        </CategoryProvider>
      </SellingUnitProvider>
    </BranchListProvider>
  );
};
