import { IconButton } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';;
import AppsIcon from '@mui/icons-material/Apps';
import DehazeIcon from '@mui/icons-material/Dehaze';
import BodyDashboard from './Body';
import PuffLoader from "react-spinners/PuffLoader";
import { useContextProduct } from '../../Context/ProductContext';
import { useInvoiceContext } from '../../Context/InvoiceContext';
import Filters from './components/Filters';
import styles from './index.css';

const DashboardHeader = () => {
    const { productList, isLoading } = useContextProduct();
    const { listedInvoiceProducts, addToInvoiceList } = useInvoiceContext();
    const [display, setDisplay] = useState('cards');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (productList? (setLoading(false)) : (setLoading(true)))
      }, [productList]);

      return (
        <div className={styles.container}>
            <div className={styles.headContainer}>
                <Filters />
                <div className={styles.iconsContainer}>
                    <IconButton onClick={() => setDisplay('cards')}>
                        <AppsIcon />
                    </IconButton>
                    <IconButton style={{ paddingRight: 0 }} onClick={() => setDisplay('lines')}>
                        <DehazeIcon />
                    </IconButton>
                </div>
            </div>
            {isLoading ? (
                <div className={styles.loadingDiv}>
                    <PuffLoader />
                </div>
            ) : (
                <BodyDashboard data={productList} display={display} addToInvoiceFunc={addToInvoiceList} invoiceList={listedInvoiceProducts} />
            )
            }
        </div>
    )
}

export default DashboardHeader;
