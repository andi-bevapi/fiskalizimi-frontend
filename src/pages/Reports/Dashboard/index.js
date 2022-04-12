import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { getDashboardReports, getChartsReports } from '../../../services/reports';
import { useModel } from 'umi';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const Dashboard = () => {
  const { initialState } = useModel('@@initialState');
  const [totals, setTotals] = useState([]);
  const [totalsCharts, setTotalsCharts] = useState([]);

  useEffect(() => {
    getTotals();
    getTotalsCharts();
  }, [initialState?.currentUser]);

  const getTotals = async () => {
    try {
      const response = await getDashboardReports(initialState?.currentUser?.clientId);
      const formatted = [];

      Object.entries(response.data[0]).map(item => {
        formatted.push({
          label: item[0] === 'totalAmount' ? 'Te ardhurat totale' : item[0] === 'totalVat' ? 'TVSH' : 'Numri i faturave',
          value: item[1]
        })
      });

      setTotals(formatted);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalsCharts = async () => {
    try {
      const response = await getChartsReports(initialState?.currentUser?.clientId);
      setTotalsCharts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {totals?.map(item => (
          <Grid item xs={4}>
            <Card sx={{ minWidth: 275, textAlign: 'left' }}>
              <CardHeader
                title={item?.label}
                titleTypographyProps={{ variant: 'h6', fontFamily: 'Poppins' }}
                style={{
                  background: '#74a19e',
                  color: '#fff',
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
        <Grid item md={6} xs={12}>
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
            <Title text="Vlera totale e faturave"/>
            <Animation />
          </Chart>
        </Grid>
        <Grid item md={6} xs={12}>
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
            <Title text="Numri total i faturave" />
            <Animation />
          </Chart>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;