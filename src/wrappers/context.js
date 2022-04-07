import { ProductProvider } from '../Context/ProductContext';
import { InvoiceProvider } from '../Context/InvoiceContext';
import Compose from '../components/Compose';

export default (props) => {
  return <Compose components={[ProductProvider, InvoiceProvider]}>{props.children}</Compose>;
};
