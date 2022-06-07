import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateRangePicker from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useModel } from 'umi';
import { getOperatorsReport } from '../../../services/reports';
import { formatDate } from '../../../helpers/formatDate';
import Filters from './components/Filters';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery'

const columns = [
    { field: 'username', headerName: 'Username', width: 120 },
    { field: 'totalAmountNoVAT', headerName: 'Total Amount No VAT', width: 150 },
    { field: 'totalAmount', headerName: 'Total Amount', width: 100 },
    { field: 'totalVat', headerName: 'VAT', width: 120 },
    { field: 'totalVat6', headerName: 'VAT 6%', width: 120 },
    { field: 'totalVat20', headerName: 'VAT 20%', width: 120 }
];

const Operators = () => {
    const { initialState } = useModel('@@initialState');
    const [filters, setFilters] = useState({});
    const [data, setData] = useState([]);
    const [dateRange, setDateRange] = useState([new Date().toString(), new Date().toString()]);
    const { t } = useTranslation();
    // const matches = useMediaQuery('(min-width:900px)')

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
            const response = await getOperatorsReport(initialState?.currentUser?.clientId, {
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
            {/* <Grid container spacing={2} paddingTop={3}> */}
                {/* <Grid item xs={12} sm={12} md={8} lg={9} xl={8}> */}
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
                                        spacing={1}
                                    >
                                        <Grid item xs={12} sm={5} md={5} lg={5} xl={3}>
                                            <TextField {...startProps} style ={{width: '100%', minWidth: '178px'}}/>
                                        </Grid>
                                        <Grid item xs={12} sm={2} md={2} lg={2} xl={3}>
                                            <Box sx={{ mx: 2 }}> {t("until")} </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={5} md={5} lg={5} xl={3}>
                                            <TextField {...endProps} style ={{width: '100%', minWidth: '178px'}}/>
                                        </Grid>

                                    </Grid>
                                </>
                            )}
                        />
                    </LocalizationProvider>
                {/* </Grid> */}
                {/* <Grid item xs={12} sm={12} md={5} lg={3} xl={3}>  */}
                {/* paddingTop={(matches ? 24 : 0)} */}
                    <Filters getData={getData} 
                    // style={{ width: window.innerWidth < 800 ? '100%' : '10%'}}

                    /> 
                    {/* style={{minWidth: '178px !important'}} */}
                {/* </Grid> */}
             {/* </Grid>  */}

            <br />

            <div style={{ height: '60vh', width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.username}
                />
            </div>
        </>
    );
};

export default Operators;