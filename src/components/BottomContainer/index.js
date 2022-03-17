import { useState } from 'react';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
  title: {
      fontSize: 20,
      color: '#1ea0b5',
  },
  hr: {
      border: 'none',
      borderBottom: '1px solid #ebeff2',
  },
  mainDiv: {
      padding: 30,
  },
  noData: {
    fontSize: 16,
    color: '#d33f3f',
  }
}));

const BottomContainer = (props) => {
  const classes = useStyles();
  return (
    <>
     <div className={classes.mainDiv}>
        <span className={classes.title}>Lista e Produkteve</span>
        <hr className={classes.hr}/>
        <div className={classes.mainDiv}>
            <p className={classes.noData}>Nuk u gjet asnjë produkt</p>
        </div>
     </div>
    </>
  );
};

export default BottomContainer;
