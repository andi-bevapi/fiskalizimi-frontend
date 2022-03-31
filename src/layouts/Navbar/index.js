import React, { useEffect, useState } from 'react';
import { useHistory, useModel } from 'umi';
import { navItems } from './navItems.config';
import SideDrawer from './components/SideDrawer';
import styles from './Navbar.module.css';
import { Typography } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import IconButtonComponent from '../../components/Button/IconButton';
import { t } from 'i18next';

const Navbar = () => {
  const { initialState, refresh } = useModel('@@initialState');
  
  const history = useHistory();

  useEffect(() => {
    refresh();
  }, [])

  const onLogoutHandler = () => {
    localStorage.removeItem('poslaToken');
    history.replace('/');
  };

  const handleEditProfile = () =>{
    history.replace('/edit-profile');
  }

  return (
    <div className={styles.navContainer}>
      <div >
        <SideDrawer navLinks={navItems} />
      </div>
      <div className={styles.rightBtns}>
       <div className={styles.menuContainer}>
          <h4>{t("editProfile")}</h4>
          <ul className={styles.editProfileContainer}>
              <li onClick={handleEditProfile}>{initialState.currentUser.username}</li>
          </ul>
       </div>
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
