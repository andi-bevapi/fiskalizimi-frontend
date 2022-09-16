import { ProductProvider } from '../Context/ProductContext';
import { InvoiceProvider } from '../Context/InvoiceContext';
import { ShiftProvider } from '../Context/ShiftContext';
import { BranchListProvider } from '../Context/BranchListContext';
import { ClientProvider } from '../Context/ClientContext';
import Compose from '../components/Compose';
import {ConfigurationProvider} from "../Context/ConfigurationsContext";

export default (props) => {
  return <Compose components={[ClientProvider,ProductProvider, InvoiceProvider,ConfigurationProvider, ShiftProvider, BranchListProvider]}>{props.children}</Compose>;
};
