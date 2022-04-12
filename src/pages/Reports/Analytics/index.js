import DateRangePicker from '@mui/lab/DateRangePicker';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { getAnalyticsData } from '../../../services/reports';
import { formatDate } from '../../../helpers/formatDate';

const columns = [
    { field: 'invoiceCode', headerName: 'Kodi i Fatures', width: 150 },
    { field: 'totalAmount', headerName: 'Vlera Totale', width: 200 },
    { field: 'totalAmountNoVAT', headerName: 'Vlera Totale pa TVSH', width: 200 },
    { field: 'totalVat', headerName: 'Vlera Totale me TVSH', width: 200 },
    { field: 'totalVat6', headerName: 'Vlera Totale TVSH 6%', width: 200 },
    { field: 'totalVat20', headerName: 'Vlera Totale TVSH 20%', width: 200 },
    { field: 'description', headerName: 'Pershkrimi', width: 200 },
    { field: 'paymentMethod', headerName: 'Menyra e Pageses', width: 200 },
    { field: 'dateTime', headerName: 'Data e Fatures', width: 200 },
    { field: 'NSLF', headerName: 'NSLF', width: 200 },
    { field: 'FIC', headerName: 'FIC', width: 200 },
];

const Analytics = () => {
    const { initialState } = useModel('@@initialState');
    const [data, setData] = useState([]);
    const [value, setValue] = useState([null, null]);

    useEffect(() => {
        getData();
    }, [initialState?.currentUser]);

    const getData = async (value) => {
        let startDate = "";
        let endDate = "";

        if(value) {
            startDate = formatDate(value[0]);
            endDate = formatDate(value[1]);
        }

        try {
            const response = await getAnalyticsData(initialState?.currentUser?.clientId, {
                startDate,
                endDate
            });
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                    startText="Data e Fillimit"
                    endText="Data e Mbarimit"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                        getData(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                        <>
                            <TextField {...startProps} />
                            <Box sx={{ mx: 2 }}> deri ne </Box>
                            <TextField {...endProps} />
                        </>
                    )}
                />
            </LocalizationProvider>

            <br />

            <div style={{ height: '70vh', width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
        </>
    );
}

export default Analytics;