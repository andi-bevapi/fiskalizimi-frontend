import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateRangePicker from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useModel } from 'umi';
import { getSoldProducts } from '../../../services/reports';
import { formatDate } from '../../../helpers/formatDate';
import Filters from './components/Filters';

const columns = [
    { field: 'name', headerName: 'Name', width: 120 },
    { field: 'barcode', headerName: 'Barcode', width: 150 },
    { field: 'stock', headerName: 'Stock', width: 80 },
    { field: 'vat', headerName: 'TVSH', width: 80 },
    { field: 'totalAmountNoVAT', headerName: 'Vlera pa TVSH', width: 120 },
    { field: 'totalAmount', headerName: 'Vlera me TVSH', width: 120 },
    { field: 'categoryName', headerName: 'Category', width: 150 },
    { field: 'supplierName', headerName: 'Supplier', width: 150 },
    { field: 'sellingUnitName', headerName: 'Selling Unit', width: 150 }
];

const SoldProducts = () => {
    const { initialState } = useModel('@@initialState');
    const [filters, setFilters] = useState({});
    const [products, setProducts] = useState([]);
    const [dateRange, setDateRange] = useState([new Date().toString(), new Date().toString()]);
    const { t } = useTranslation();

    useEffect(() => {
        getData();
    }, [initialState?.currentUser, dateRange]);

    const getData = async (values = {}) => {
        if(Object.keys(values).length > 0) setFilters(values);
    
        const startDate = formatDate(dateRange[0]);
        const endDate = formatDate(dateRange[1]);

        let query = values;

        if(Object.keys(query).length === 0) {
            query = filters;
        } 

        try {
            const response = await getSoldProducts(initialState?.currentUser?.clientId, {
                startDate,
                endDate,
                ...query
            });
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                    startText={t("beginingDate")}
                    endText={t("endingngDate")}
                    value={dateRange}
                    onChange={setDateRange}
                    renderInput={(startProps, endProps) => (
                        <>
                            <TextField {...startProps} />
                            <Box sx={{ mx: 2 }}> {t("until")} </Box>
                            <TextField {...endProps} />
                        </>
                    )}
                />
            </LocalizationProvider>

            <br />

            <Filters getData={getData} />

            <br />

            <div style={{ height: '60vh', width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row.name}
                    rows={products}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
        </>
    );
};

export default SoldProducts;