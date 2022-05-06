import { Drawer, Fab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Menu } from '@mui/icons-material';
import * as React from 'react';
import { useState } from 'react';
import NavItems from './NavItems';
import styles from '../components/navigationStyles.css'
import { history } from 'umi';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';//home
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  fab: {
    boxShadow: 'none !important',
    borderRadius: '3px !important'
  },
});

const SideDrawer = () => {
  const classes = useStyles();
  const {t} = useTranslation();

  const [arka, setArka] = useState(null);
  const [state, setState] = useState({ right: false });

  React.useEffect(() => {
    setArka(JSON.parse(localStorage.getItem('arkaConnected')))
  }, [])

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ [anchor]: open });
  };

  const sideDrawerList = (anchor) => (
    <div
      className={styles.sideMenu}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <NavItems />
    </div>
  );

  return (
    <React.Fragment>
      <Fab
        className={classes.fab}
        edge="start"
        aria-label="menu"
        onClick={toggleDrawer('right', true)}
        size="small"
      >
        <Menu fontSize="small" />
      </Fab>
      <Drawer anchor="left" open={state.right} onClose={toggleDrawer('left', false)}>
        {sideDrawerList('left')}
      </Drawer>
      <Button className={styles.mainPageLink} onClick={() => {history.push('/')}}><HomeIcon /></Button>
      {arka && <Button className={styles.cashPageLink} onClick={() => {history.push('/arka')}}>{arka.name}</Button>}
    </React.Fragment>
  );
};

export default SideDrawer;
