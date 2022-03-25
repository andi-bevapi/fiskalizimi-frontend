import React, {useState} from 'react';
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
    height: "100px",
    padding: "15px 5px 0 3px",
    width: "100%",
    boxShadow: "none",
    border: "1px solid #ebeff2",
    borderRadius: "0",
    backgroundSize: "cover",
    backgroundImage: "url(" + cardBackground +")",
    marginLeft: "0%",
    "&:hover": {
      transition: "transform 0.2s ease-in-out",
      transform: "scale3d(1.1, 1.05, 1)",
      cursor: "pointer",
    },
  }
}));


const ItemCard = (props) => {
  const classes = useStyles();
  const [product, setProduct] = useState(props.item);
  // const { t } = useTranslation();

  const handleCardClick = () => {
    props.addToInvoice(product);
  }

  return (
    <Card className={classes.card} 
       onClick={() => {handleCardClick()}}
    >
      <CardContent
        style={{
          padding: "5px 5px",
          textAlign: "center",
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
          "stock" {Number(props.item.stock).toFixed(2)}
        </Typography>

        <Typography
          variant="body"
          className={styles.priceText}
          color="#81c868"
          style={{
            fontWeight: "700",
          }}
        >
          ALL {props.item.price}
        </Typography>
      </CardContent>
    </Card>
    
  );
};

export default ItemCard;
