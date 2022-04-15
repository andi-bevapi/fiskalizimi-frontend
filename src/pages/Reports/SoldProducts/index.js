import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { getSoldProductsBySupplier, getSoldProductsByCategory } from '../../../services/reports';
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

const SoldProducts = () => {
    const { initialState } = useModel('@@initialState');
    const [supplierProducts, setSupplierProducts] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);

    useEffect(() => {
        getSoldByCategory();
        getSoldBySupplier();
    }, [initialState?.currentUser]);

    const getSoldByCategory = async () => {
        try {
            const response = await getSoldProductsByCategory(initialState?.currentUser?.clientId);
            setCategoryProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getSoldBySupplier = async () => {
        try {
            const response = await getSoldProductsBySupplier(initialState?.currentUser?.clientId);
            setSupplierProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Grid container spacing={6}>
                <Grid item md={6} xs={12}>
                    <Chart
                        data={categoryProducts}
                    >
                        <ArgumentAxis />
                        <ValueAxis max={7} />

                        <BarSeries
                            valueField="totalProducts"
                            argumentField="name"
                            color="#74A19E"
                        />
                        <Title text="Produktet e Shitura ne baze te kategorive" />
                        <Animation />
                    </Chart>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Chart
                        data={supplierProducts}
                    >
                        <ArgumentAxis />
                        <ValueAxis max={7} />

                        <BarSeries
                            valueField="totalProducts"
                            argumentField="name"
                            color="#ff7a00"
                        />
                        <Title text="Produktet e Shitura ne baze te furnitoreve" />
                        <Animation />
                    </Chart>
                </Grid>
            </Grid>
        </>
    );
};

export default SoldProducts;