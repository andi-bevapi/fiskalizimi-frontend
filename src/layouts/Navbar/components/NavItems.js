import React from 'react';
import { navItems } from '../navItems.config';
import Button from '@mui/material/Button';
import { history, Access, useAccess } from 'umi';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  btn: {
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    justifyContent: 'flex-start',
    fontSize: '1rem',
    color: 'black',
    padding: '5px 10px',
    fontWeight: '500',
    textTransform: 'none',
  },
}));
const NavItems = () => {
  const access = useAccess();
  const classes = useStyles();

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <>
      {navItems.map((item, i) => (
        <Access key={i} accessible={item.access ? access[item.access] : true}>
          <Button
            fullWidth={true}
            className={classes.btn}
            onClick={() => handleClick(item.path)}
            color="inherit"
          >
            {item.title}
          </Button>
        </Access>
      ))}
    </>
  );
};

export default NavItems;
