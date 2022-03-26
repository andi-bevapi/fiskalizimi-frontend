import { Divider, Grid, IconButton } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import SearchFilter from '../../components/SearchFilter';
import AppsIcon from '@mui/icons-material/Apps';
import DehazeIcon from '@mui/icons-material/Dehaze';
import BodyDashboard from './Body';
import { makeStyles } from '@mui/styles';
import PuffLoader from "react-spinners/PuffLoader";
import { useContextProduct } from '../../Context/ProductContext';
import { useInvoiceContext } from '../../Context/InvoiceContext';

const useStyles = makeStyles(() => ({
    container: { display: 'flex', flexDirection: 'column', width: '100%', height: '100%' },
    headContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconsContainer: {
        display: 'flex',
        height: '40px',
    },
    loadingDiv: {
        height: '90%',
        marginTop: '30%',
        marginLeft: '-5%',
        opacity: 0.5
    }
}));


const DashboardHeader = () => {
    const { productList } = useContextProduct();
    const { listedInvoiceProducts, addToInvoiceList } = useInvoiceContext();
    const classes = useStyles();
    const [filteredData, setFilteredData] = useState([...productList]);
    const [display, setDisplay] = useState('cards');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //setFilteredData(productList);
    }, []);

    //Search Product
    const filterProducts = () => {

    };

    return (
        <div className={classes.container}>
            <div className={classes.headContainer}>
                <SearchFilter onFilter={filterProducts} placeholder="Kerko Produkt" />
                <div className={classes.iconsContainer}>
                    <IconButton onClick={() => setDisplay('cards')}>
                        <AppsIcon />
                    </IconButton>
                    <IconButton style={{ paddingRight: 0 }} onClick={() => setDisplay('lines')}>
                        <DehazeIcon />
                    </IconButton>
                </div>
            </div>
            {loading ? (
                <div className={classes.loadingDiv}>
                    <PuffLoader />
                </div>
            ) : (
                <BodyDashboard data={productList} display={display} addToInvoiceFunc={addToInvoiceList} invoiceList={listedInvoiceProducts}/>
            )
            }
        </div>
    )
}

export default DashboardHeader;
