// import { useBuying } from "../../../Context/BuyingContext";
import IconButtonComponent from "../../../components/Button/IconButton.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PriceDescription from "./PriceDescription";
import { Divider } from "@mui/material";
import styles from "./ItemsOnBuy.module.css";
// import { useTranslation } from "react-i18next";
import SearchByBarcode from "./SearchByBarcode";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  table: {
  },
  tableCell: {
    padding: "10px 1px",
    color: "#505458",
  },
  tableCellStart: {
    padding: "2px 4px",
    color: "#505458",
  },
  tableHeadStart: {
    padding: "2px 4px",
    fontWeight: "bold !important",
    color: "#fff",
    backgroundColor: "#74A19E",
  },
  tableHead: {
    padding: "5px 1px",
    fontWeight: "bold !important",
    fontSize: '1.2em !important',
    color: "#fff !important",
    backgroundColor: "#74A19E !important",
  },
  customTableContainer: {
    height: "100%",
  },
  tableMainHeader:{
    backgroundColor: "#74A19E",
  }
}));

const ItemsOnBuy = () => {
  // const { handleRemoveProduct, buyingList, handleDestroyBuyingList } =
  //   useBuying();
  // const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={styles.mainHolder}>
      <SearchByBarcode />
      <TableContainer classes={{ root: classes.customTableContainer }} style={{ marginTop: 20}}>
        <Table stickyHeader className={classes.table}>
          <TableHead className={classes.tableMainHeader}>
            <TableRow>
              <TableCell className={classes.tableHead}>Nr.</TableCell>
              <TableCell className={classes.tableHead} id={styles["name"]}>
                Produkti
              </TableCell>
              <TableCell className={classes.tableHead} id={styles["quantity"]}>
                Sasia
              </TableCell>
              <TableCell className={classes.tableHead} id={styles["price"]}>
                Çmimi
              </TableCell>
              <TableCell className={classes.tableHead} id={styles["delete"]}>
                  &nbsp;&nbsp;
              </TableCell>
              {/* <TableCell className={classes.tableHead}>
                {" "}
                <IconButtonComponent
                  style={{ backgroundColor: "rgb(240, 80, 80)" }}
                  icon={<DeleteForeverIcon />}
                  iconColor={{ color: "white" }}
                  // onClick={() => handleDestroyBuyingList()}
                />
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {buyingList.map((row, index) => (
              <TableRow key={index}>
                <TableCell className={classes.tableCellStart}>
                  {index + 1}
                </TableCell>
                <TableCell className={classes.tableCell} id={styles["name"]}>
                  {row.name}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  id={styles["quantity"]}
                >
                  <ItemQuantity element={row} />
                </TableCell>
                <TableCell className={classes.tableCell} id={styles["price"]}>
                  {row.qty === 0 ? "0" : (row.price * row.qty).toFixed(2)}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <IconButtonComponent
                    style={{ backgroundColor: "rgb(240, 80, 80)" }}
                    icon={<DeleteForeverIcon fontSize={"small"} />}
                    iconColor={{ color: "white" }}
                    onClick={() => handleRemoveProduct(row.id)}
                  />
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <PriceDescription />
    </div>
  );
};

export default ItemsOnBuy;
