import React from 'react';
import { navItems } from '../navItems.config';
import Button from '@mui/material/Button';
import { history, Access, useAccess } from 'umi';
import { makeStyles } from '@mui/styles';
import styles from '../components/navigationStyles.css'
import HomeIcon from '@mui/icons-material/Home';//home
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'; // users
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'; //arkat
import SettingsIcon from '@mui/icons-material/Settings';//settings
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';//produktet
import ReceiptIcon from '@mui/icons-material/Receipt'; //invoices
import BarChartIcon from '@mui/icons-material/BarChart'; //reports
import Box from '@mui/material/Box';
import { useTranslation } from "react-i18next";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

const useStyles = makeStyles(() => ({

}));

const NavItems = ({open, handleClick2})=> {
  const {t} = useTranslation();
  const classes = useStyles();
  const access = useAccess();

  const handleClick = (path) => {
      history.push(path);
  };

  const IconStyles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360
    },
    icon: {
      color: 'white',
    }
  });

  const renderNavItems = (title) => {
    switch (title) {
      case "Faqja kryesore":
        return <>
          <> <Box m={1} pt={1}> <HomeIcon /> </Box> </> <span> {t("homePage")} </span> </>;
      case "Produktet":
        return <> </>
          {/* <> <Box m={1} pt={1}> <ProductionQuantityLimitsIcon /> </Box> </> <span>{t("products")} <ArrowDropDownIcon/> </span> </>; */}
      // case "Kategorite":
      //   return <>
      //     <> <Box m={1} pt={1}> <CategoryIcon /> </Box> </> <span>{t("category")}</span> </>;
      // case "Njesite matese":
      //   return <>
      //     <> <Box m={1} pt={1}> <SquareFootIcon /> </Box> </> <span>{t("measureUnits")}</span> </>;
      // case "Pikat e shitjes":
      //   return <>
      //     <> <Box m={1} pt={1}> <StoreMallDirectoryIcon /> </Box> </> <span>{t("pointOfSales")}</span> </>;
      // case "Furnitoret":
      //   return <>
      //     <> <Box m={1} pt={1}> <StorefrontIcon /> </Box> </> <span>{t("suppliers")}</span> </>;
      case "Arkat":
        return <>
          <> <Box m={1} pt={1}> <PointOfSaleIcon /> </Box> </> <span>Arkat</span> </>;
      case "Perdoruesit":
        return <>
          <> <Box m={1} pt={1}> <PeopleAltIcon /> </Box> </> <span>{t("users")}</span> </>;
      case "Raportet":
        return <>
          <> <Box m={1} pt={1}> <PeopleAltIcon /> </Box> </> <span>{t("reports")}</span> </>;
      case "Arkat":
        return <>
          <> <Box m={1} pt={1}> <PointOfSaleIcon /> </Box> </> <span>Arkat</span> </>;
       case 'Faturat':
        return <>
          <> <Box m={1} pt={1}> <ReceiptIcon /> </Box> </> <span>{t("invoices")}</span> </>;
      case 'Konfigurime':
        return <>
          <> <Box m={1} pt={1}> <SettingsIcon /> </Box> </> <span>{t("configurations")}</span> </>;
      default:
        return null;
    }
  }

  
  return (
    <>
      {navItems.map((item, i) => {
        return (
          item.hasSubItems ? 
          <List>
          <ListItemButton>
          <ListItemIcon className={styles.iconsStyle}>
          <ProductionQuantityLimitsIcon />
          </ListItemIcon>
          <ListItemText primary={item.title} primaryTypographyProps={{fontSize: '1.2em !important', fontFamily: 'Poppins'}} onClick={() => handleClick(item.path)} />
          {open ? <ExpandLess onClick={handleClick2} /> : <ExpandMore  onClick={handleClick2}/>}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit> 
          <List component="div" disablePadding>
            {item.subItems.map((subItem, icon) => {
              return (
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleClick(subItem.path)}>
                  <ListItemIcon className={styles.submenuIconsStyle}>
                  {subItem.icon}
                  </ListItemIcon>
                  <ListItemText primary={subItem.title} primaryTypographyProps={{fontSize: '1.2em', fontFamily: 'Poppins'}}/>
                </ListItemButton>
              );
            }
            )}
          </List>
        </Collapse>
        </List>
          : 
          <Access key={i} accessible={item.access ? access[item.access] : true}>
            <Button
              fullWidth={true}
              className={styles.menuLink}
              onClick={() => handleClick(item.path)}
              color="inherit"
            >
              {renderNavItems(item.title)}
            </Button>
          </Access>
        )
      })}
      <span className={styles.companyName}><span className={styles.orange}>Ovla</span> Systems</span>
    </>
  );
};

export default NavItems;
