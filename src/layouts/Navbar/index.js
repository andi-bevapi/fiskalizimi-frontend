import React, { useEffect, useState } from 'react';
import { useHistory, useModel } from 'umi';
import { navItems } from './navItems.config';
import SideDrawer from './components/SideDrawer';
import styles from './Navbar.module.css';
import { Typography } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import IconButtonComponent from '../../components/Button/IconButton';
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

const Navbar = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {t} = useTranslation();

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

  const handleClickButton = (event) =>{
    setAnchorEl(event.currentTarget);
  }

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.navContainer}>
      <div>
        <SideDrawer navLinks={navItems} />
      </div>
      <div className={styles.rightBtns}>
        <div className={styles.menuContainer}>
            <Button
                onClick={handleClickButton}
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined} variant="contained">
                {initialState.currentUser.username}
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleEditProfile}> 
                    <EditIcon  style={{marginRight:"10px"}}/> 
                    {t("editProfile")}
                </MenuItem>
            </Menu>
        </div>
        <IconButtonComponent
          style={{ backgroundColor: '#FF7A00', width: '45px', height: '45px', boxShadow: 'none' }}
          icon={<Logout />}
          iconColor={{ color: 'white' }}
          text={t("logout")}
          onClick={onLogoutHandler}
        />
      </div>
    </div>
  );
};

export default Navbar;
