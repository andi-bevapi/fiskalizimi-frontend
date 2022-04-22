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
import { useTranslation } from "react-i18next";
import i18n from "i18next";
const columns = [
    { field: 'invoiceCode', headerName: i18n.t('billCode'), width: 150 },
    { field: 'totalAmount', headerName: i18n.t('totalValue'), width: 200 },
    { field: 'totalAmountNoVAT', headerName: i18n.t('totalValueNoVat') , width: 200 },
    { field: 'totalVat', headerName: i18n.t('totalValueWithVat'), width: 200 },
    { field: 'totalVat6', headerName: i18n.t('totalValueVat_6'), width: 200 },
    { field: 'totalVat20', headerName: i18n.t('totalValueVat_20'), width: 200 },
    { field: 'description', headerName: i18n.t('descriptionLabel'), width: 200 },
    { field: 'paymentMethod', headerName: i18n.t('paymentMethod'), width: 200 },
    { field: 'dateTime', headerName: i18n.t("billDate"), width: 200 }
];

const Analytics = () => {
    const { initialState } = useModel('@@initialState');
    const [data, setData] = useState([]);
    const [value, setValue] = useState([null, null]);
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState(null);
    const {t} = useTranslation();

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
                    startText= {t("beginingDate")}
                    endText={t("endingngDate")}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                        getData(newValue);
                    }}
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
                                    <TableCell>{t("billCode")}</TableCell>
                                    <TableCell>{t("totalValue")}</TableCell>
                                    <TableCell>{t("totalValueNoVat")}</TableCell>
                                    <TableCell>{t("totalValueWithVat")}</TableCell>
                                    <TableCell>{t("totalValueVat_6")}</TableCell>
                                    <TableCell>{t("totalValueVat_20")}</TableCell>
                                    <TableCell>{t("paymentMethod")}</TableCell>
                                    <TableCell>{t("Stock")}</TableCell>
                                    <TableCell>{t("product_name")}</TableCell>
                                    <TableCell>{t("originalPrice")}</TableCell>
                                    <TableCell>{t("finalPrice")}</TableCell>
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