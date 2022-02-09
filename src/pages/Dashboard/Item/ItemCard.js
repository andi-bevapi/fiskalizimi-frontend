import { CardMedia, Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// import { useBuying } from "../../../../Context/BuyingContext";
import { makeStyles } from "@mui/styles";
// import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  text: {
    fontFamily:
      '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: "12px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    width: "100%",
  },
  textName: {
    fontFamily:
      '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: "13px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  card: {
    height: "167px",
    padding: "3px 3px",
    maxWidth: "230px",
    boxShadow: "none",
    border: "1px solid #ebeff2",
    borderRadius: "0",
    marginLeft: "0%",
    "&:hover": {
      transition: "transform 0.15s ease-in-out",
      transform: "scale3d(1.1, 1.05, 1)",
    },
  },
  divider: {
    border: "1px solid #ebeff2",
    margin: "0px 0 2px 0",
  },
}));

const ItemCard = (props) => {
  const classes = useStyles();
  // const { t } = useTranslation();

  // const { addToBuyingList } = useBuying();

  return (
    <Card className={classes.card} 
    // onClick={() => addToBuyingList(props.item)}
    >
      <CardMedia
        component="img"
        alt={props.item.name}
        image={
          props.item.image
            ? props.item.image
            : "default.jpg"
        }
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          height: "50%",
          width: "50%",
          borderRadius: "50%"
        }}
      />
      <CardContent
        style={{
          padding: "2px 5px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            minHeight: "40px",
            width: "100%",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.textName}
          >
            {props.item.name}
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <Typography
          variant="body2"
          color="text.secondary"
          className={classes.text}
        >
          "stock" {Number(props.item.stock).toFixed(2)}
        </Typography>

        <Typography
          variant="body"
          className={classes.text}
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
