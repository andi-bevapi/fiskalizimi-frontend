import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { getDashboardReports, getChartsReports } from '../../../services/reports';
import { useModel } from 'umi';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { formatDate } from '../../../helpers/formatDate';
import { Animation } from '@devexpress/dx-react-chart';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { initialState } = useModel('@@initialState');
  const [dateRange, setDateRange] = useState([new Date().toString(), new Date().toString()]);
  const [totals, setTotals] = useState([]);
  const [totalsCharts, setTotalsCharts] = useState([]);
  const [selectedOption, setSelectedOption] = useState('daily');
  const { t } = useTranslation();

  useEffect(() => {
    getTotals();
    getTotalsCharts();
  }, [initialState?.currentUser, dateRange]);

  const getTotals = async () => {
    const startDate = formatDate(dateRange[0]);
    const endDate = formatDate(dateRange[1]);

    try {
      const response = await getDashboardReports(initialState?.currentUser?.clientId, {
        startDate,
        endDate
      });
      const formatted = [];

      if (response.data.length > 0) {
        Object.entries(response.data[0]).map(item => {
          formatted.push({
            label: item[0] === 'totalAmount' ? 'Te ardhurat totale' : item[0] === 'totalVat' ? 'TVSH' : 'Numri i faturave',
            value: item[1]
          })
        });
      }

      setTotals(formatted);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalsCharts = async () => {

    let startDate = formatDate(dateRange[0]);
    let endDate = dateRange[1] ? formatDate(dateRange[1])
      : formatDate(new Date());

    try {
      const response = await getChartsReports(initialState?.currentUser?.clientId, { startDate, endDate });
      setTotalsCharts(response.data);
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


      <br />

      <Grid container spacing={2}>
        {totals?.map(item => (
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            {/* minWidth: 275, */}
            <Card sx={{ textAlign: 'left' }}>
              <CardHeader
                title={item?.label}
                titleTypographyProps={{ variant: 'h6', fontFamily: 'Poppins' }}
                style={{
                  background: '#74a19e',
                  color: '#fff',
                  minHeight: '80px',
                  maxHeight: '120px',
                  fontSize: '18px !important',

                }}
              />
              <CardContent>
                <Typography variant="h5" component="div" align='right' style={{ color: '#0D4D47', fontFamily: 'Poppins', fontWeight: 700 }}>
                  {Number.isInteger(item?.value) ? item?.value : item?.value.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>


      <br /><br />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Chart
            data={totalsCharts}
          >
            <ArgumentAxis />
            <ValueAxis max={7} />

            <BarSeries
              valueField="totalAmount"
              argumentField="dateCreated"
              color="#74A19E"
            />
            <Title text={t("totallBillValue")} />
            <Animation />
          </Chart>
        </Grid>
        <Grid item xs={12} md={6}>
          <Chart
            data={totalsCharts}
          >
            <ArgumentAxis />
            <ValueAxis max={7} />

            <BarSeries
              valueField="totalInvoices"
              argumentField="dateCreated"
              color="#ff7a00"
            />
            <Title text={t("totalNumberBill")} />
            <Animation />
          </Chart>
        </Grid>
      </Grid>

    </>
  );
};

export default Dashboard;