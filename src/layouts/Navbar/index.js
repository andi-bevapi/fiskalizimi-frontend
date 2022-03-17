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
        {/* <IconButtonComponent
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            marginRight: '10px',
          }}
          icon={<PersonIcon />}
          iconColor={{ color: 'grey' }}
        /> */}

        <span className={styles.userName}>Username Here</span>
        <IconButtonComponent
          style={{ backgroundColor: '#FF7A00', width: '50px', height: '50px', boxShadow: 'none' }}
          icon={<Logout />}
          iconColor={{ color: 'white' }}
        />
      </div>
    </div>
  );
};

export default Navbar;
