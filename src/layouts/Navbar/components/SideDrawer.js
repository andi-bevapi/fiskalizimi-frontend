import { Drawer, Fab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Menu } from '@mui/icons-material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import NavItems from './NavItems';
import styles from '../components/navigationStyles.css'
import { history } from 'umi';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';//home
import { useTranslation } from "react-i18next";
import { useModel } from 'umi';
import { useContextArka } from '../../../Context/ArkaContext';

const useStyles = makeStyles({
  fab: {
    boxShadow: 'none !important',
    borderRadius: '3px !important'
  },
});


const SideDrawer = () => {
  const { selectedDeposit } = useContextArka();
  const classes = useStyles();
  const { initialState, refresh } = useModel('@@initialState');
  const {t} = useTranslation();
  const [state, setState] = useState({ right: false });
  
  // state for the drawer collapse
  const [open, setOpen] = React.useState(false);
  const handleClick2 = () => {
    //history.push(path);
    setOpen(!open);
  };

  useEffect(() => {
  }, [selectedDeposit, initialState]);



  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ [anchor]: open });
  };

  const sideDrawerList = (anchor) => (
    <div
      className={styles.sideMenu}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <NavItems open={open} handleClick2={handleClick2} closeDrawer={toggleDrawer()}/>
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
      <Button className={styles.cashPageLink} onClick={() => {history.push('/arka')}}>{t("ark")}</Button>
      {/* {localStorage.getItem('deposit') && <Button className={styles.cashPageLink} onClick={() => {history.push('/arka')}}>{initialState?.currentUser?.arka.name}</Button>} */}
    </React.Fragment>
  );
};

export default SideDrawer;
