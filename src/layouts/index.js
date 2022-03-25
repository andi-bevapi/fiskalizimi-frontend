import styles from './index.css';
import Navbar from './Navbar';
import Body from './Body';
import { InvoiceProvider } from "../Context/InvoiceContext";

const BasicLayout = (props) => {

  return (
    <div className={styles.layout}>
      <Navbar />
      <InvoiceProvider>
        <Body children={props.children} />
      </InvoiceProvider>
    </div>
  );
}

export default BasicLayout;
