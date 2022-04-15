import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Invoices from './Invoices';
import SoldProducts from './SoldProducts';
import styles from './reportsStyle.css'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Reports = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Dashboard" {...a11yProps(0)} className={styles.tabFonts}/>
        <Tab label="Regjistri Analitik" {...a11yProps(1)} className={styles.tabFonts}/>
        <Tab label="Faturat" {...a11yProps(2)} className={styles.tabFonts}/>
        <Tab label="Produktet e Shitura" {...a11yProps(3)} className={styles.tabFonts}/>
      </Tabs>
      <TabPanel value={value} index={0}>
        <Dashboard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Analytics />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Invoices />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SoldProducts />
      </TabPanel>
    </Box>
  );
};

export default Reports;