import { Divider } from '@mui/material';
import ButtonComponent from '../../../../../components/Button/Button';
// import styles from "../PriceDescription.module.css";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import IconButtonComponent from '../../../../../components/Button/IconButton';
import BlockIcon from '@mui/icons-material/Block';
import PanToolIcon from '@mui/icons-material/PanTool';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { makeStyles } from '@mui/styles';
// import { useBuying } from "../../../../../Context/BuyingContext";
// import { useTranslation } from "react-i18next";
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
  },
  btnContainer: {
    display: 'flex',
    marginRight: '0%',
    marginLeft: 'auto',
  },
}));

const ActionButtons = (props) => {
  const classes = useStyles();
  // const { handleDestroyBuyingList } = useBuying();
  // const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <div
        sx={{
          width: '1050%',
        }}
      >
        <Divider />
      </div>
      <div
        className={classes.btnContainer}
      >
        <IconButtonComponent
          style={{
            backgroundColor: 'rgb(38, 179, 201)',
            marginRight: '10px',
          }}
          icon={<LocalPrintshopIcon />}
          // onClick={props.handleSettings}
          iconColor={{ color: 'white' }}
        />
        <ButtonComponent
          title="cancel"
          lightColor="rgb(240, 80, 80)"
          darkColor="rgb(220, 80, 80)"
          addIcon={false}
          // onClick={handleDestroyBuyingList}
          // onClickAdd={props.handleAddProduct}
          icon={<BlockIcon />}
        />
        <ButtonComponent
          title="hold"
          lightColor="#5fbeaa"
          darkColor="#51a794"
          addIcon={false}
          onClick={props.freeze}
          icon={<PanToolIcon />}
        />

        <ButtonComponent
          title="pay"
          lightColor="rgba(129, 200, 104, 0.8)"
          darkColor="rgba(129, 200, 104, 1)"
          addIcon={false}
          // onClick={props.handlePay}
          icon={<LocalAtmIcon />}
        />
      </div>
    </div>
  );
};

export default ActionButtons;
