import React from 'react';
import { navItems } from '../navItems.config';
import Button from '@mui/material/Button';
import { history, Access } from 'umi';
import { makeStyles } from '@mui/styles';
import styles from '../components/navigationStyles.css'

const useStyles = makeStyles(() => ({

}));

const NavItems = () => {
  const classes = useStyles();

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <>
      {navItems.map((item, i) => (
        <Access key={i} accessible={true /* item.access */}>
          <Button
            fullWidth={true}
            className={styles.menuLink}
            onClick={() => handleClick(item.path)}
            color="inherit"
          >
            {item.title == "Konfigurime" ? (
              <>
                ❖ {item.title}
              </>
            ) : (
              <>
                ☳ {item.title}
              </>
            )}

          </Button>
        </Access>
      ))}

      <span className={styles.companyName}><span className={styles.orange}>Ovla</span> Systems</span>
    </>
  );
};

export default NavItems;
