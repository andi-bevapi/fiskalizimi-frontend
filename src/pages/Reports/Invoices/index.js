import { useState } from 'react';
import styles from './../reportsStyle.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`horizontal-tabpanel-${index}`}
            aria-labelledby={`horizontal-tab-${index}`}
            {...other}
            style={{ width: '100%' }}
        >
            {value === index && (
                <Box sx={{ px: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `horizontal-tab-${index}`,
        'aria-controls': `horizontal-tabpanel-${index}`,
    };
}


const Invoices = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <span className={styles.title}>  Faturat </span>
            <Tabs
                value={value}
                onChange={handleChange}
                tabItemContainerStyle={styles.activeInvoiceTab}
            >
                <Tab {...a11yProps(0)}  label="Faturat e Fiskalizuara" {...a11yProps(0)} className={styles.tabFonts}/>
                <Tab {...a11yProps(1)}  label="Faturat e PaFiskalizuara" {...a11yProps(1)} className={styles.tabFonts}/>
            </Tabs>
            <TabPanel value={value} index={0}>
               
            </TabPanel>
            <TabPanel value={value} index={1}>
               
            </TabPanel>
        </>
    );
};

export default Invoices;