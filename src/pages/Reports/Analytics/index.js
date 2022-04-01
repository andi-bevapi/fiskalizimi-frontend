import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useModel } from 'umi';
import { getAnalyticsData } from '../../../services/reports';

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

    useEffect(() => {
        getData();
    }, [initialState?.currentUser]);

    const getData = async () => {
        try {
            const response = await getAnalyticsData(initialState?.currentUser?.clientId);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ height: '70vh', width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
        </div>
    );
}

export default Analytics;