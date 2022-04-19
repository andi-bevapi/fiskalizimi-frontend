import DateRangePicker from '@mui/lab/DateRangePicker';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { getAnalyticsData, getSingleInvoiceAnalytics } from '../../../services/reports';
import { formatDate } from '../../../helpers/formatDate';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const columns = [
    { field: 'invoiceCode', headerName: 'Kodi i Fatures', width: 150 },
    { field: 'totalAmount', headerName: 'Vlera Totale', width: 200 },
    { field: 'totalAmountNoVAT', headerName: 'Vlera Totale pa TVSH', width: 200 },
    { field: 'totalVat', headerName: 'Vlera Totale me TVSH', width: 200 },
    { field: 'totalVat6', headerName: 'Vlera Totale TVSH 6%', width: 200 },
    { field: 'totalVat20', headerName: 'Vlera Totale TVSH 20%', width: 200 },
    { field: 'description', headerName: 'Pershkrimi', width: 200 },
    { field: 'paymentMethod', headerName: 'Menyra e Pageses', width: 200 },
    { field: 'dateTime', headerName: 'Data e Fatures', width: 200 }
];

const Analytics = () => {
    const { initialState } = useModel('@@initialState');
    const [data, setData] = useState([]);
    const [value, setValue] = useState([null, null]);
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState(null);

    useEffect(() => {
        getData();
    }, [initialState?.currentUser]);

    const getData = async (value) => {
        let startDate = "";
        let endDate = "";

        if (value) {
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

    const getSelectedInvoice = async (row) => {
        try {
            const response = await getSingleInvoiceAnalytics(initialState?.currentUser?.clientId, row.id);
            setRows(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
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
                    onCellClick={(row) => {
                        setOpen(true);
                        getSelectedInvoice(row.row);
                    }}
                />
            </div>

            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setRows(null);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Kodi i Fatures</TableCell>
                                    <TableCell>Vlera Totale</TableCell>
                                    <TableCell>Vlera Totale pa TVSH</TableCell>
                                    <TableCell>Vlera Totale me TVSH</TableCell>
                                    <TableCell>Vlera Totale TVSH 6%</TableCell>
                                    <TableCell>Vlera Totale TVSH 20%</TableCell>
                                    <TableCell>Menyra e Pageses</TableCell>
                                    <TableCell>Sasia</TableCell>
                                    <TableCell>Emri i Produktit</TableCell>
                                    <TableCell>Cmimi Origjinal</TableCell>
                                    <TableCell>Cmimi Final</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows?.map((row) => (
                                    <TableRow
                                        key={row.invoiceCode}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.invoiceCode}
                                        </TableCell>
                                        <TableCell align="right">{row.totalAmount}</TableCell>
                                        <TableCell align="right">{row.totalAmountNoVAT}</TableCell>
                                        <TableCell align="right">{row.totalVat}</TableCell>
                                        <TableCell align="right">{row.totalVat6}</TableCell>
                                        <TableCell align="right">{row.totalVat20}</TableCell>
                                        <TableCell align="right">{row.paymentMethod}</TableCell>
                                        <TableCell align="right">{row.quantity}</TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.originalPrice}</TableCell>
                                        <TableCell align="right">{row.finalPrice}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
        </>
    );
}

export default Analytics;