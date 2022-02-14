import React from 'react';
import { navItems } from './navItems.config';
import SideDrawer from './components/SideDrawer';
import styles from './Navbar.module.css';
import { Typography } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import IconButtonComponent from '../../components/Button/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = (props) => {

  return (
    <div className={styles.navContainer}>
      <div >
        <SideDrawer navLinks={navItems} />
      </div>
      <div className={styles.rightBtns}>
        <IconButtonComponent
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            marginRight: '10px',
          }}
          icon={<PersonIcon />}
          iconColor={{ color: 'grey' }}
        />
        <IconButtonComponent
          style={{
            backgroundColor: 'transparent',
            marginRight: '5px',
            padding: '7px 9px 2px 9px',
            borderRadius: '3px',
          }}
          //   icon={<Typography>{JSON.parse(localStorage.getItem('user')).username}</Typography>}
          icon={<Typography>username here</Typography>}
          iconColor={{ color: 'grey' }}
        />
        <IconButtonComponent
          style={{ backgroundColor: '#ffaa33', marginRight: '5px', borderRadius: '5px' }}
          icon={<Logout />}
          iconColor={{ color: 'white' }}
        />
      </div>
    </div>
  );
};

export default Navbar;
