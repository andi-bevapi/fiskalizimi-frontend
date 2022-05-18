import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Dashboard from './Dashboard'
import Analytics from './Analytics'
import Invoices from './Invoices'
import SoldProducts from './SoldProducts'
import styles from './reportsStyle.css'
import i18n from 'i18next'
import { Grid } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { CategoryProvider } from '../../Context/CategoryContext'
import { SellingUnitProvider } from '../../Context/SellingUnitContext'
import { SupplierProvider } from '../../Context/SuppliersContext'
import { UsersListProvider } from '../../Context/UsersListContext'
import Compose from '../../components/Compose'
import Operators from './Operators'
import DailyTurnover from './DailyTurnover'

function TabPanel (props) {
  const { children, value, index, ...other } = props
  const matches = useMediaQuery('(max-width:600px)')

  return (
    <div
      role='tabpanel'
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
  )
}

function a11yProps (index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

const Reports = () => {
  const [value, setValue] = useState(0)
  const matches = useMediaQuery('(max-width:600px)')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Compose
      components={[UsersListProvider, CategoryProvider, SellingUnitProvider, SupplierProvider]}
    >
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
        <Grid container xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={matches ? 12 : 4} sm={4} md={3} lg={3}>
            <Tabs
              orientation={matches ? 'horizontal' : 'vertical'}
              variant='scrollable'
              value={value}
              onChange={handleChange}
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab label='Dashboard' {...a11yProps(0)} className={styles.tabFonts} />
              <Tab
                label={i18n.t('analyticalRegister')}
                {...a11yProps(1)}
                className={styles.tabFonts}
              />
              <Tab label={i18n.t('bill')} {...a11yProps(2)} className={styles.tabFonts} />
              <Tab label={i18n.t('soldProducts')} {...a11yProps(3)} className={styles.tabFonts} />
              <Tab label='Operatoret' {...a11yProps(4)} className={styles.tabFonts} />
              <Tab
                label='Xhiro ditore sipas turneve'
                {...a11yProps(5)}
                className={styles.tabFonts}
              />
            </Tabs>
          </Grid>

          <Grid item xs={matches ? 12 : 8} sm={8} md={9} lg={9} style={{marginTop: 20}}>
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
          <TabPanel value={value} index={4}>
            <Operators />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <DailyTurnover />
          </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </Compose>
  )
}

export default Reports
