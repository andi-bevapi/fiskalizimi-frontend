import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useModel } from 'umi';
import { navItems } from './navItems.config';
import SideDrawer from './components/SideDrawer';
import styles from './Navbar.module.css';
import Logout from '@mui/icons-material/Logout';
import IconButtonComponent from '../../components/Button/IconButton';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import { SwalModal } from '../../components/Modal/SwalModal';
import { updateShift } from '../../services/shiftHistory';
import { useContextShift } from '../../Context/ShiftContext';
import Swal from 'sweetalert2';
import { getDailySummaryReport } from '../../services/reports';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PrintShiftDetails from "../../../src/components/PrintShiftDefails"
import ReactToPrint from "react-to-print";
import { ArkaProvider } from '../../Context/ArkaContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Navbar = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState({});
  const { shiftIsOpen, setShiftIsOpen } = useContextShift();
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const componentRef = useRef();

  const history = useHistory();

  useEffect(() => {
    refresh();
  }, []);

  const onLogoutHandler = () => {
    if (shiftIsOpen) {
      Swal.fire({
        title:
          "<h5 style='font-family: Poppins; font-size: 20px; color: #082e2b; font-weight: 600'>" +
          `${t('endShiftModal')}` +
          '</h5>',
        text: '',
        icon: 'warning',
        showDenyButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        denyButtonColor: '#d33',
        denyButtonText: "<span style='font-family: Poppins;'>" + `${t('justLogout')}` + '</span>',
        confirmButtonText: `${t('endShift')}`,
      }).then((result) => {
        if (result.isConfirmed) {
          closeShiftAndLogout();
        } else if (result.isDenied) {
          logout();
        }
      });
    } else {
      logout();
    }
  };

  const onLogoutHandlerAdmin = () => {
    Swal.fire({
      title:
        "<h5 style='font-family: Poppins; font-size: 20px; color: #082e2b; font-weight: 600'>" +
        `Deshironi te dilni?` +
        '</h5>',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "<span style='font-family: Poppins;'>" + `Jo` + '</span>',
      confirmButtonText: `Po`,
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      } else if (result.isDismissed) {
      }
    });
  };

  const closeShiftAndLogout = () => {
    closeShift();
    logout();
  };

  const logout = () => {
    localStorage.removeItem('poslaToken');
    localStorage.removeItem('clientId');
    history.replace('/');
  };

  const handleEditProfile = () => {
    history.replace('/edit-profile');
  };

  const handleClickButton = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShiftButton = async () => {
    const summaryData = await getDailySummaryReport(initialState?.currentUser?.id);
    setSummaryData(summaryData.data[0]);

    return SwalModal(
      `${t('endShiftOnly')}`,
      `Vlera Totale: ${Number(summaryData.data[0]?.totalAmount).toLocaleString('en-US')}`,
      'question',
      `${t('no_')}`,
      `${t('yes')}`,
      () => {},
      () => closeShift(),
    );
  };

  const closeShift = async () => {
    const response = await updateShift(initialState?.currentUser?.id);
    if (response.statusCode === 200) {
      setShiftIsOpen(false);
      setShowSummary(true);
    }
    localStorage.removeItem('deposit');
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleRemoveClient = () => {
    localStorage.removeItem('clientId');
    refresh();
  };

  return (
    <ArkaProvider>
        <div
        className={styles.navContainer}
        style={{ flexDirection: window.innerWidth < 800 ? 'column' : 'row' }}
      >
        <div style={{ margin: window.innerWidth < 800 ? '11px 0px' : 0 }}>
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
          {initialState.currentUser?.branchId !== 0 && shiftIsOpen && (
            <Button
              style={{
                backgroundColor: '#74A19E',
                marginRight: window.innerWidth < 800 ? '14px' : '10px',
                fontSize: '12px',
                padding: window.innerWidth < 800 ? '3px 4px' : '6px 16px',
              }}
              onClick={handleShiftButton}
              variant="contained"
            >
              {t('endShift')}
            </Button>
          )}
          <IconButtonComponent
            style={{ backgroundColor: '#FF7A00', width: '45px', height: '45px', boxShadow: 'none' }}
            icon={<Logout />}
            iconColor={{ color: 'white' }}
            text={t('logout')}
            onClick={onLogoutHandler}
          />
        </div>

        <Modal
          open={showSummary}
          onClose={() => {
            setShowSummary(false);
            setSummaryData({});
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Permbledhja Ditore:
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Vlera Totale: {summaryData?.totalAmount ? Number(summaryData?.totalAmount).toFixed(2) : 0}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Vlera Totale pa TVSH:{' '}
              {summaryData?.totalAmountNoVAT ? Number(summaryData?.totalAmountNoVAT).toFixed(2) : 0}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Vlera Totale TVSH 6%: {summaryData?.totalVat6 ? Number(summaryData?.totalVat6).toFixed(2) : 0}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Vlera Totale TVSH 20%:{' '}
              {summaryData?.totalVat20 ? Number(summaryData?.totalVat20).toFixed(2) : 0}
            </Typography>
            <div className={styles.buttonContainer}>
              <ReactToPrint
                  trigger={(e) =>
                      <Button variant="contained" type="submit" className={styles.buttonStyle}> {t("printBill")} </Button>
                    }
                  onBeforePrint={()=>{ document.title = "Xhiro Ditore" }}
                  onAfterPrint={()=>{ document.title = "Fiskalizimi"}}
                  content={() => componentRef.current}
              />
              <div style={{ display: "none" }}>
                <PrintShiftDetails summaryData={summaryData} ref={componentRef} />
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </ArkaProvider>
  );
};

export default Navbar;
