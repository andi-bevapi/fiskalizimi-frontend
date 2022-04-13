import { ProductProvider } from '../Context/ProductContext';
import { InvoiceProvider } from '../Context/InvoiceContext';
import Compose from '../components/Compose';
import {ConfigurationProvider} from "../Context/ConfigurationsContext";

export default (props) => {
  return <Compose components={[ProductProvider, InvoiceProvider,ConfigurationProvider]}>{props.children}</Compose>;
};
