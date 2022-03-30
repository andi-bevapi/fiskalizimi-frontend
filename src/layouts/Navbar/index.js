import React, { useEffect, useState } from 'react';
import { useHistory, useModel } from 'umi';
import { navItems } from './navItems.config';
import SideDrawer from './components/SideDrawer';
import styles from './Navbar.module.css';
import { Typography } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import IconButtonComponent from '../../components/Button/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

  const handleEditUser = () =>{
    history.replace('/edit-profile');
  }

  return (
    <div className={styles.navContainer}>
      <div >
        <SideDrawer navLinks={navItems} />
      </div>
      <div className={styles.rightBtns}>
        <FormControl style={{width:"170px"}}>
        <InputLabel id="demo-simple-select-label" className={styles.usenameStyles}>{initialState.currentUser.username}</InputLabel>
          <Select
             className= {styles.customSelect}
             disableUnderline
             variant="standard"
          >
            <MenuItem value={30} onClick={() => handleEditUser()}>Edito profilin</MenuItem>
          </Select>
        </FormControl>
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
