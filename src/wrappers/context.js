import { ProductProvider } from '../Context/ProductContext';
import { InvoiceProvider } from '../Context/InvoiceContext';

export default (props) => {
  return (
    <ProductProvider>
      <InvoiceProvider>
        {props.children}
      </InvoiceProvider>
    </ProductProvider>
  );
};
