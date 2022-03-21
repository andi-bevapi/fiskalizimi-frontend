import React from 'react';
import { navItems } from '../navItems.config';
import Button from '@mui/material/Button';
import { history, Access } from 'umi';
import { makeStyles } from '@mui/styles';
import styles from '../components/navigationStyles.css'
import StoreIcon from '@mui/icons-material/Store';//home
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'; // users
import StorefrontIcon from '@mui/icons-material/Storefront';; //furnizuesit
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'; //njesite e shitjes
import CategoryIcon from '@mui/icons-material/Category'; //category
import SettingsIcon from '@mui/icons-material/Settings';//settings
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';//produktet
import Box from '@mui/material/Box';

const useStyles = makeStyles(() => ({

}));

const NavItems = () => {
  const classes = useStyles();

  const handleClick = (path) => {
    history.push(path);
  };

const renderNavItems = (title) => {
  console.log(title);
  switch(title) {
    case "Faqja kryesore" :
      return <> 
          <> <Box m={1} pt={1}> <StoreIcon /> </Box> </> <span> {title} </span> </>;
    
    case "Produktet" :
      return <>
         <> <Box m={1} pt={1}> <ProductionQuantityLimitsIcon /> </Box> </> <span>{title}</span> </> ;

    case "Kategorite" :
      return <>  
      <> <Box m={1} pt={1}> <CategoryIcon /> </Box> </> <span>{title}</span> </> ;
      
    case "Njesite e shitjes" :
       return <> 
        <> <Box m={1} pt={1}> <PointOfSaleIcon /> </Box> </> <span>{title}</span> </> ;
       
    case "Perdoruesit" :
       return <> 
        <> <Box m={1} pt={1}> <PeopleAltIcon /> </Box> </> <span>{title}</span> </> ;
       
    case "Furnizuesit" :
      return <> 
       <> <Box m={1} pt={1}> <StorefrontIcon /> </Box> </> <span>{title}</span> </> ;
    
    case 'Konfigurime':
      return <> 
       <> <Box m={1} pt={1}> <SettingsIcon /> </Box> </> <span>{title}</span> </> ;

    default:
      return 'foo';
  }
}
return (
  <>
    {navItems.map((item, i) => {
        console.log("ITEM", item)
        return(
          <>
           <Access key={i} accessible={true /* item.access */}>
        <Button
          fullWidth={true}
          className={styles.menuLink}
          onClick={() => handleClick(item.path)}
          color="inherit"
        >
          {renderNavItems(item.title)}
        </Button>
      </Access>
          </>
        )
    })}
    <span className={styles.companyName}><span className={styles.orange}>Ovla</span> Systems</span>
  </>
);
};

export default NavItems;
