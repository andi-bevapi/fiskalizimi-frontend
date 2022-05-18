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
import IconButtonComponent from '../../../components/Button/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InvoicePreview from '../../../components/InvoicePreview';
import Export from './components/Export';
import Grid from '@mui/material/Grid';

const Analytics = () => {
    const { initialState } = useModel('@@initialState');
    const [data, setData] = useState([]);
    const [dateRange, setDateRange] = useState([new Date().toString(), new Date().toString()]);
    const [open, setOpen] = useState(false);
    const [viewInvoice, setViewInvoice] = useState(null);
    const [rows, setRows] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const { t } = useTranslation();

    const columns = [
        { field: 'invoiceCode', headerName: i18n.t('billCode'), width: 120 },
        { field: 'totalAmount', headerName: i18n.t('totalValue'), width: 100 },
        { field: 'totalAmountNoVAT', headerName: i18n.t('totalValueNoVat'), width: 180 },
        { field: 'totalVat', headerName: i18n.t('totalValueWithVat'), width: 150 },
        { field: 'totalVat6', headerName: i18n.t('totalValueVat_6'), width: 180 },
        { field: 'totalVat20', headerName: i18n.t('totalValueVat_20'), width: 180 },
        { field: 'description', headerName: i18n.t('descriptionLabel'), width: 120 },
        { field: 'paymentMethod', headerName: i18n.t('paymentMethod'), width: 150 },
        { field: 'dateTime', headerName: i18n.t("billDate"), width: 200 },
        {
            field: "actions",
            headerName: i18n.t("actions"),
            width: 80,
            sortable: false,
            align: 'center',
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();
                    setViewInvoice(true);
                    setSelectedRow(params.row);
                };

                return <IconButtonComponent
                    style={{
                        backgroundColor: '#0D4D47'
                    }}
                    icon={<VisibilityIcon />}
                    iconColor={{ color: 'white' }}
                    onClick={onClick}
                />
            }
        },
    ];

    useEffect(() => {
        getData();
    }, [initialState?.currentUser, dateRange]);

    const getData = async () => {
        const startDate = formatDate(dateRange[0]);
        const endDate = formatDate(dateRange[1]);

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
        p: 4
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            startText={t("beginingDate")}
                            endText={t("endingngDate")}
                            value={dateRange}
                            onChange={setDateRange}
                            renderInput={(startProps, endProps) => (
                                <>

                                    <Grid container
                                        display={"flex"}
                                        alignItems="center"
                                        paddingTop={3}
                                        spacing={1}
                                    >
                                        <Grid item xs={12} sm={5} md={5} lg={5}>
                                            <TextField {...startProps} style ={{width: '100%'}} />
                                        </Grid>
                                        <Grid item xs={12} sm={2} md={2} lg={2}>
                                            <Box sx={{ mx: 2 }}> {t("until")} </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={5} md={5} lg={5}>
                                            <TextField {...endProps} style ={{width: '100%'}}/>
                                        </Grid>

                                    </Grid>
                                </>
                            )}
                        />
                    </LocalizationProvider>
                </Grid>


                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    {data.length > 0 && <Export data={data} />}
                </Grid>
            </Grid>

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
                style={{ width: '80%' }}
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

            <Modal
                open={viewInvoice}
                onClose={() => {
                    setViewInvoice(false);
                    setSelectedRow(null);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <InvoicePreview data={selectedRow} />
                </Box>
            </Modal>
        </>
    );
}

export default Analytics;