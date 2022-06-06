import { SupplierProvider } from '../../Context/SuppliersContext';
import Suppliers from './Suppliers';

export default () => {
  return (
    <SupplierProvider>
      <Suppliers />
    </SupplierProvider>
  );
};
