import React, { useEffect } from 'react';
import { useHistory, useModel } from 'umi';
import { navItems } from './navItems.config';
import SideDrawer from './components/SideDrawer';
import styles from './Navbar.module.css';
import { Typography } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import IconButtonComponent from '../../components/Button/IconButton';

const Navbar = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const history = useHistory();

  useEffect(() => {
    refresh();
  }, [])

  const onLogoutHandler = () => {
    localStorage.removeItem('token');
    history.replace('/');
  };

  return (
    <div className={styles.navContainer}>
      <div >
        <SideDrawer navLinks={navItems} />
      </div>
      <div className={styles.rightBtns}>
        <span className={styles.userName}>{initialState.currentUser.username}</span>
        <IconButtonComponent
          style={{ backgroundColor: '#FF7A00', width: '50px', height: '50px', boxShadow: 'none' }}
          icon={<Logout />}
          iconColor={{ color: 'white' }}
          onClick={onLogoutHandler}
        />
      </div>
    </div>
  );
};

export default Navbar;
