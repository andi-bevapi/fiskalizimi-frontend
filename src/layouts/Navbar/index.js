import styles from './HeadersButton.module.css';
import { Typography } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import IconButtonComponent from '../../shared/Button/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';

// import { useTranslation } from 'react-i18next';
// import { useSettingsContext } from '../../../Context/SettingsContext';
import { makeStyles } from '@mui/styles';
// import { useProducts } from '../../../Context/productsContext';
// import { useAuth } from '../../../Context/AuthContext';

const useStyles = makeStyles((theme) => ({
  editStyle: {
    backgroundColor: '#ffa500',
    marginRight: 10,
    '&:hover': { backgroundColor: '#ffa500' },
  },
  icon: {
    display: 'flex',
    marginLeft: '-30px',
    marginTop: '20px',
    marginBottom: '-10px',
    zIndex: 2,
    color: '#505458',
    animation: `$myEffect 1000ms infinite`,
  },
  '@keyframes myEffect': {
    '0%': {
      transform: 'translateY(10%)',
    },
    '100%': {
      transform: 'translateY(-20%)',
    },
  },
  cancelIcon: {
    marginTop: '-5px',
    width: '11px',
    cursor: 'pointer',
    marginLeft: '-5px',
  },
}));

const Navbar = (props) => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   const { t } = useTranslation();
  //   const { open, setOpen } = useSettingsContext();
  const classes = useStyles();
  //   const { displayIcon, setDisplayIcon } = useProducts();
  //   const { displayIconSettings, setDisplayIconSettings } = useAuth();

  return (
    <div className={styles.navContainer}>
      <div className={styles.leftBtns}>
        <IconButtonComponent
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            marginRight: '10px',
          }}
          icon={<MenuIcon />}
          iconColor={{ color: 'grey' }}
          onClick={props.handleProfile}
        />
      </div>
      <div className={styles.rightBtns}>
        <div style={{ display: 'flex' }}>
          <IconButtonComponent
            style={{ backgroundColor: '#51a794', marginRight: '5px' }}
            icon={<SettingsIcon />}
            onClick={props.handleSettings}
            iconColor={{ color: 'white' }}
          />
        </div>
        <IconButtonComponent
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            marginRight: '10px',
          }}
          icon={<PersonIcon />}
          iconColor={{ color: 'grey' }}
          onClick={props.handleProfile}
        />
        <IconButtonComponent
          style={{ backgroundColor: 'transparent', marginRight: '5px' }}
          //   icon={<Typography>{JSON.parse(localStorage.getItem('user')).username}</Typography>}
          icon={<Typography>username here</Typography>}
          iconColor={{ color: 'grey' }}
          onClick={props.handleProfile}
        />
        <IconButtonComponent
          style={{ backgroundColor: '#ffaa33', marginRight: '5px' }}
          icon={<Logout />}
          iconColor={{ color: 'white' }}
          onClick={props.handleLogout}
        />
      </div>
    </div>
  );
};

export default Navbar;
