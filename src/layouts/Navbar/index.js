import React, { useEffect, useState } from 'react';
import { useHistory, useModel } from 'umi';
import { navItems } from './navItems.config';
import SideDrawer from './components/SideDrawer';
import styles from './Navbar.module.css';
import Logout from '@mui/icons-material/Logout';
import IconButtonComponent from '../../components/Button/IconButton';
import { t } from 'i18next';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import { SwalModal } from '../../components/Modal/SwalModal';
import { updateShift } from '../../services/shiftHistory';
import { useContextShift } from '../../Context/ShiftContext';

const Navbar = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const [anchorEl, setAnchorEl] = useState(null);
  const { shiftIsOpen, setShiftIsOpen } = useContextShift();
  const open = Boolean(anchorEl);

  const history = useHistory();

  useEffect(() => {
    refresh();
  }, []);

  const onLogoutHandler = () => {
    if (shiftIsOpen) {
      return SwalModal(
        'Deshironi te mbyllni dhe turnin apo doni vetem te dilni?',
        '',
        'warning',
        'Vetem Logout',
        'Mbyll Turnin',
        () => logout(),
        () => closeShiftAndLogout(),
      );
    } else {
      logout();
    }
  };

  const closeShiftAndLogout = () => {
    closeShift();
    logout();
  }

  const logout = () => {
    localStorage.removeItem('poslaToken');
    history.replace('/');
  };

  const handleEditProfile = () => {
    history.replace('/edit-profile');
  };

  const handleClickButton = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShiftButton = () => {
    return SwalModal(
      'Deshironi te mbyllni turnin?',
      '',
      'warning',
      'JO',
      'PO',
      () => {},
      () => closeShift(),
    );
  };

  const closeShift = async () => {
    const response = await updateShift(initialState?.currentUser?.id);
    if (response.statusCode === 200) setShiftIsOpen(false);
  };

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
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
          >
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
              <EditIcon style={{ marginRight: '10px' }} />
              {t('editProfile')}
            </MenuItem>
          </Menu>
        </div>
        {shiftIsOpen && (
          <Button
            style={{ backgroundColor: '#74A19E', marginRight: '10px' }}
            onClick={handleShiftButton}
            variant="contained"
          >
            Mbyll Turnin
          </Button>
        )}
        <IconButtonComponent
          style={{ backgroundColor: '#FF7A00', width: '45px', height: '45px', boxShadow: 'none' }}
          icon={<Logout />}
          iconColor={{ color: 'white' }}
          onClick={onLogoutHandler}
        />
      </div>
    </div>
  );
};

export default Navbar;
