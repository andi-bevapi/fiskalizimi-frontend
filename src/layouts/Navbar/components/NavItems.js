import React from 'react';
import { navItems } from '../navItems.config';
import Button from '@mui/material/Button';
import { history, Access, useAccess } from 'umi';
import { makeStyles } from '@mui/styles';
import styles from '../components/navigationStyles.css'
import HomeIcon from '@mui/icons-material/Home';//home
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'; // users
import StorefrontIcon from '@mui/icons-material/Storefront';; //furnitoret
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'; //njesite e shitjes
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory'; //pikat e shitjes
import CategoryIcon from '@mui/icons-material/Category'; //category
import SettingsIcon from '@mui/icons-material/Settings';//settings
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';//produktet
import Box from '@mui/material/Box';
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({

}));

const NavItems = () => {
  const {t} = useTranslation();
  const classes = useStyles();
  const access = useAccess();

  const handleClick = (path) => {
    history.push(path);
  };

  const renderNavItems = (title) => {
    switch (title) {
      case "Faqja kryesore":
        return <>
          <> <Box m={1} pt={1}> <HomeIcon /> </Box> </> <span> {t("homePage")} </span> </>;
      case "Produktet":
        return <>
          <> <Box m={1} pt={1}> <ProductionQuantityLimitsIcon /> </Box> </> <span>{t("products")}</span> </>;
      case "Kategorite":
        return <>
          <> <Box m={1} pt={1}> <CategoryIcon /> </Box> </> <span>{t("category")}</span> </>;
      case "Njesite matese":
        return <>
          <> <Box m={1} pt={1}> <PointOfSaleIcon /> </Box> </> <span>{t("measureUnits")}</span> </>;
      case "Pikat e shitjes":
        return <>
          <> <Box m={1} pt={1}> <StoreMallDirectoryIcon /> </Box> </> <span>{t("pointOfSales")}</span> </>;
      case "Furnitoret":
        return <>
          <> <Box m={1} pt={1}> <StorefrontIcon /> </Box> </> <span>{t("suppliers")}</span> </>;
      case "Perdoruesit":
        return <>
          <> <Box m={1} pt={1}> <PeopleAltIcon /> </Box> </> <span>{t("users")}</span> </>;
      case "Raportet":
        return <>
          <> <Box m={1} pt={1}> <PeopleAltIcon /> </Box> </> <span>{t("reports")}</span> </>;
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
