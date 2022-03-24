import { Divider } from '@mui/material';
import ButtonComponent from '../../../../../components/Button/InvoiceButton';
// import styles from "../PriceDescription.module.css";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import IconButtonComponent from '../../../../../components/Button/IconButton';
import BlockIcon from '@mui/icons-material/Block';
import PanToolIcon from '@mui/icons-material/PanTool';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import styles from '../../../OnBuy/ItemsOnBuy.module.css';
// import { useBuying } from "../../../../../Context/BuyingContext";
// import { useTranslation } from "react-i18next";
import { Grid } from '@mui/material';
import { margin } from '@mui/system';

const ActionButtons = (props) => {
  // const { handleDestroyBuyingList } = useBuying();
  // const { t } = useTranslation();

  return (
    <div className={styles.actionButtonContainer}>
      <div
        sx={{
          width: '1050%',
        }}
      >
        {/* <Divider /> */}
      </div>
      <div
        className={styles.buttonsList}
      >
        

        {/* <IconButtonComponent
          style={{
            backgroundColor: 'rgb(38, 179, 201)',
            marginRight: '10px',
          }}
          icon={<LocalPrintshopIcon />}
          // onClick={props.handleSettings}
          iconColor={{ color: 'white' }}
        />  */}
        <Grid container marginBottom={1} spacing={1} alignItems="center" direction="row" justifyContent="center">
          <Grid item xs={12} sm={4} md={4} style={{display:'block', alignItems:"center"}}>
            <ButtonComponent
              title="FSHI"
              lightColor="rgb(240, 80, 80)"
              //darkColor="rgb(220, 80, 80)"
              addIcon={false}
              // onClick={handleDestroyBuyingList}
              // onClickAdd={props.handleAddProduct}
              icon={<BlockIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} style={{display:'block', alignItems:"center"}}>
            <ButtonComponent
            title="PAGUAJ"
            lightColor="#0d4d47"
            //darkColor="#34a138"
            addIcon={false}
            // onClick={props.handlePay}
            icon={<LocalAtmIcon />}
          />
           </Grid>
         <Grid item xs={12} sm={4} md={4} style={{display:'block', alignItems:"center"}}>
            <ButtonComponent
            title="RUAJ"
            lightColor="#74a19e"
            //darkColor="#51a794"
            addIcon={false}
            onClick={props.freeze}
            icon={<PanToolIcon />}
          />
          </Grid>
        </Grid>
      
      </div>
    </div>
  );
};

export default ActionButtons;
