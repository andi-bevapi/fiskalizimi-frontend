import React, { useState, useEffect } from 'react';
import { CardMedia, Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
// import { useTranslation } from "react-i18next";
import cardBackground from './../../../assets/images/cardBackground.png';
import styles from './ItemLine.module.css';

const useStyles = makeStyles((theme) => ({
  card: {
    height: "200px",
    padding: "10px 5px 0 3px",
    width: "80%",
    boxShadow: "none",
    border: "1px solid #ebeff2",
    borderRadius: "0",
    backgroundSize: "cover",
    backgroundImage: "url(" + cardBackground + ")",
    marginLeft: "0%",
    "&:hover": {
      transition: "transform 0.2s ease-in-out",
      transform: "scale(1.05)",
      cursor: "pointer",
    },
  },

  cardDisabled: {
    height: "200px",
    padding: "10px 5px 0 3px",
    width: "80%",
    boxShadow: "none",
    border: "1px solid #ebeff2",
    borderRadius: "0",
    backgroundSize: "cover",
    backgroundImage: "url(" + cardBackground + ")",
    marginLeft: "0%",
    "&:hover": {
      transition: "transform 0.2s ease-in-out",
      transform: "scale(1.05)",
      cursor: "not-allowed",
    },
    opacity: 0.5
  }
}));


const ItemCard = (props) => {
  const classes = useStyles();
  const [product, setProduct] = useState(props.item);
  const [quantity, setProductQuantity] = useState(1);
  const [stopAdding, setStopAdding] = useState(false);
  // const { t } = useTranslation();

  useEffect(() => {
    ((props.invoiceList?.filter(item => item.id === props.item.id)).length >= 1 ? null : setStopAdding(false));
  }, [props.invoiceList]);

  const handleCardClick = () => {
    const isExisting = ((props.invoiceList?.filter(item => item.id === product.id)).length >= 1 ? true : false);
    if (isExisting) {
      if (quantity > Number(product.stock)) {
        setStopAdding(true);
      } else {
        setProductQuantity(quantity + 1);
        props.addToInvoiceList(product, quantity);
      }
    } else {
      setProductQuantity(1);
      (Number(product.stock) == 1 ? (setStopAdding(true)) : (props.addToInvoiceList(product, 1)));
    }

  }

  return (
    <Card className={stopAdding ? classes.cardDisabled : classes.card}
      onClick={() => { handleCardClick() }}
    >
      <CardMedia
        component="img"
        alt={props.item.name}
        image={props.item.imageVirtualPath ? (props.item.imageVirtualPath) : "https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"}
        style={{ width: 100, height: 100, margin: "auto", marginLeft: 5, marginTop: -5, borderRadius: "50%" }}
      />
      <CardContent
        style={{
          padding: "5px",
          textAlign: "center",
          marginTop: -8
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.textName}
          >
            {props.item.name}
          </Typography>
        </div>
        <Divider className={styles.divider} />
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.stockText}
        >
          Stoku: {Number(props.item.stock)}
        </Typography>

        <Typography
          variant="body"
          className={styles.priceText}
          color="#81c868"
          style={{
            fontWeight: "700",
          }}
        >
          ALL {Number(props.item.price).toFixed(2)}
        </Typography>
      </CardContent>
    </Card>

  );
};

export default ItemCard;
