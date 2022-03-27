import styles from './index.css';
import Navbar from './Navbar';
import Body from './Body';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { Suspense } from 'react';
import { InvoiceProvider } from "../Context/InvoiceContext";
const BasicLayout = (props) => {

  return (
    <div className={styles.layout}>
       <Suspense fallback="Loading...">
        <I18nextProvider i18n={i18n}>
            <Navbar/>
            <InvoiceProvider>
            <Body children={props.children}/>
            </InvoiceProvider>
        </I18nextProvider>
        </Suspense>
    </div>
  );
}

export default BasicLayout;
