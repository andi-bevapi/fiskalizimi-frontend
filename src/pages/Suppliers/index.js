import { SupplierProvider } from '../../Context/SuppliersContext';
import { BranchListProvider } from '../../Context/BranchListContext';
import Suppliers from './Suppliers';

export default () => {
  return (
    <BranchListProvider>
      <SupplierProvider>
        <Suppliers />
      </SupplierProvider>
    </BranchListProvider>
  );
};
