import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateRangePicker from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useModel } from 'umi';
import { getDailyTurnoverReport } from '../../../services/reports';
import { formatDate } from '../../../helpers/formatDate';
import { Grid } from '@mui/material';

const columns = [
    {
        field: 'shiftStart', headerName: 'Shift Start', width: 200, renderCell: (params) => {
            return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(params.row.shiftStart));
        }
    },
    { field: 'shiftEnd', headerName: 'Shift End', width: 200 },
    { field: 'username', headerName: 'Username', width: 120 },
    { field: 'totalAmountNoVAT', headerName: 'Total Amount No VAT', width: 150, renderCell: (params) => {
        return params.row.totalAmountNoVAT.toFixed(2);
    } },
    { field: 'totalAmount', headerName: 'Total Amount', width: 100, renderCell: (params) => {
        return params.row.totalAmount.toFixed(2);
    } }
];

const DailyTurnover = () => {
    const { initialState } = useModel('@@initialState');
    const [filters, setFilters] = useState({});
    const [data, setData] = useState([]);
    const [dateRange, setDateRange] = useState([new Date().toString(), new Date().toString()]);
    const { t } = useTranslation();

    useEffect(() => {
        getData();
    }, [initialState?.currentUser, dateRange]);

    const getData = async (values = {}) => {
        if (Object.keys(values).length > 0) setFilters(values);

        const startDate = formatDate(dateRange[0]);
        const endDate = formatDate(dateRange[1]);

        let query = values;

        if (Object.keys(query).length === 0) {
            query = filters;
        }

        try {
            const response = await getDailyTurnoverReport({
                startDate,
                endDate,
                ...query
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
                                <TextField {...startProps} style ={{width: '100%'}}/>
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


            <br />

            <div style={{ height: '60vh', width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.id}
                />
            </div>
        </>
    );
};

export default DailyTurnover;