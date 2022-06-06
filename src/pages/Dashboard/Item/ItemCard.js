import React, { useState, useEffect } from 'react';
import { CardMedia, Divider } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import cardBackground from './../../../assets/images/cardBackground.png';
import styles from './ItemLine.module.css';
import { useTranslation } from 'react-i18next';
import { SwalModal } from '../../../components/Modal/SwalModal';
import { useModel } from 'umi';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '220px',
    padding: '10px 5px 0 3px',
    width: '90%',
    boxShadow: 'none',
    border: '1px solid #ebeff2',
    borderRadius: '0',
    backgroundSize: 'cover',
    backgroundImage: 'url(' + cardBackground + ')',
    marginLeft: '0%',
    '&:hover': {
      transition: 'transform 0.2s ease-in-out',
      transform: 'scale(1.05)',
      cursor: 'pointer',
    },
    marginBottom: '5px',
  },

  cardDisabled: {
    height: '220px',
    padding: '10px 5px 0 3px',
    width: '90%',
    boxShadow: 'none',
    border: '1px solid #ebeff2',
    borderRadius: '0',
    backgroundSize: 'cover',
    backgroundImage: 'url(' + cardBackground + ')',
    marginLeft: '0%',
    '&:hover': {
      transition: 'transform 0.2s ease-in-out',
      transform: 'scale(1.05)',
      cursor: 'not-allowed',
    },
    opacity: 0.5,
    marginBottom: '5px',
  },
}));

const ItemCard = (props) => {
  const { initialState } = useModel('@@initialState');

  const classes = useStyles();
  const [product, setProduct] = useState(props.item);
  const [quantity, setProductQuantity] = useState();
  const [stopAdding, setStopAdding] = useState(false);
  const { t } = useTranslation();

  useEffect(
    () => {
      const arrayProduct = props.invoiceList?.filter((item) => item.id === props.item.id);

      arrayProduct[0]?.stockCheck
        ? arrayProduct[0].quantity >= Number(product.stock).toFixed(0)
          ? setStopAdding(true)
          : setStopAdding(false)
        : product.stockCheck
        ? Number(product.stock).toFixed(0) == 0
          ? setStopAdding(true)
          : setStopAdding(false)
        : setStopAdding(false);
      // ((props.invoiceList?.filter(item => item.id === props.item.id)).length >= 1 ? null : setStopAdding(false));
    },
    [props.invoiceList],
    props.item,
  );

  const handleCardClick = () => {
    if (!localStorage.getItem('deposit')) {
      return SwalModal(
        t('noConnectedArka'),
        '',
        'warning',
        t('close'),
        '',
        () => {},
        () => {},
      );
    }
    if (!stopAdding) {
      const productFromArray = props.invoiceList?.filter((item) => item.id === props.item.id);
      const isExisting = productFromArray.length >= 1 ? true : false;
      if (product.stockCheck) {
        if (isExisting) {
          if (productFromArray[0].quantity >= Number(product.stock).toFixed(0)) {
            setStopAdding(true);
          } else {
            setProductQuantity(productFromArray[0].quantity + 1);
            props.addToInvoiceList(product, productFromArray[0].quantity + 1);
          }
        } else {
          setProductQuantity(1);
          props.addToInvoiceList(product, 1);
          Number(product.stock) == 1 ? setStopAdding(true) : setStopAdding(false);
        }
      } else {
        if (isExisting) {
          setProductQuantity(productFromArray[0].quantity + 1);
          props.addToInvoiceList(product, productFromArray[0].quantity + 1);
        } else {
          setProductQuantity(1);
          // (Number(product.stock) == 1 ? (setStopAdding(true)) : (props.addToInvoiceList(product, 1)));
          props.addToInvoiceList(product, 1);
        }
      }
    }
  };

  return (
    <Card className={stopAdding ? classes.cardDisabled : classes.card} onClick={handleCardClick}>
      <CardMedia
        component="img"
        alt={props.item.name}
        image={
          props.item.imageVirtualPath
            ? props.item.imageVirtualPath
            : 'https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg'
        }
        style={{
          width: 90,
          height: 90,
          margin: 'auto',
          marginLeft: 5,
          marginTop: -2,
          borderRadius: '50%',
        }}
      />
      <CardContent
        style={{
          padding: '5px',
          textAlign: 'center',
          marginTop: 2,
        }}
      >
        <div
          style={{
            width: '100%',
          }}
        >
          <Typography variant="body2" color="text.secondary" className={styles.textName}>
            {props.item.name}
          </Typography>
        </div>
        <Divider className={styles.divider} />
        <Typography variant="body2" color="text.secondary" className={styles.stockText}>
          {t('Barcode')}: {Number(props.item.barcode)}
        </Typography>
        <Typography variant="body2" color="text.secondary" className={styles.stockText}>
          {t('Stock')}: {Number(props.item.stock)}
        </Typography>

        <Typography
          variant="body"
          className={styles.priceText}
          color="#81c868"
          style={{
            fontWeight: '700',
          }}
        >
          {t('price')} {Number(props.item.price).toFixed(2)}
        </Typography>

        {initialState?.currentUser?.branchId === 0 && (
          <Typography variant="body2" color="text.secondary" className={styles.stockText}>
            {t('branch')}: {props.item.branch.name}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ItemCard;
