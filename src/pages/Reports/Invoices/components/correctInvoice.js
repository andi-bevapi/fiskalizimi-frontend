import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTranslation } from "react-i18next";
import Paper from '@mui/material/Paper';
import styles from './style.css';
import IconButtonComponent from '../../../../components/Button/IconButton';
import { SwalModal } from '../../../../components/Modal/SwalModal';
import ButtonComponent from '../../../../components/Button/InvoiceButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useInvoiceContext } from '../../../../Context/InvoiceContext';
import { useMoneyDepositContext } from '../../../../Context/MoneyDepositContext';
import {dateFormatInvoiceFiscalized} from "../../../../helpers/formatDate"

const CorrectiveInvoice = (props) => {
    const {handleCorrectiveInvoice} = useInvoiceContext();
    const { reduceAmountFromDeposit } = useMoneyDepositContext();
    const [hasChanges, setHasChanges] = useState(false);
    const [newInvoice, setNewInvoice] = useState(JSON.parse(JSON.stringify(props?.data)));
    const [totalVat, setTotalVat] = useState(props?.data.totalVat);
    const [totalVat6, setTotalVat6] = useState(props?.data.totalVat6);
    const [totalVat20, setTotalVat20] = useState(props?.data.totalVat20);
    const [totalAmountNoVat, setTotalAmountNoVat] = useState(props?.data.totalAmountNoVAT);
    const [totalAmount, setTotalAmount] = useState(props?.data.totalAmount);
    const { initialState } = useModel('@@initialState');

    const { t } = useTranslation();

    useEffect(() => {
    }, [hasChanges]);

    const handleDelete = (product, quantity=-1) => {
        if(newInvoice.productList){
          delete newInvoice.productList;
        }
        let tempArray1 = [];
        let totalVAT = 0;
        let totalAmount = 0;

        if(quantity==-1){
            tempArray1 = newInvoice.items.filter(item => item.id !== product.id);
        }else{
            let productIndex = ""; //find the index of the product
            newInvoice.items.map((item, index) => {
                (item.id === product.id ? productIndex = index : "")
            });
            let allItems = newInvoice.items;
            allItems[productIndex].quantity=quantity;
            tempArray1 = allItems;
        }
        tempArray1.map((product) => {
            totalVAT += Number((product.finalPrice-product.originalPrice)*product.quantity);
            totalAmount += Number(product.finalPrice * product.quantity);
        })
        setTotalVat(Number(totalVAT).toFixed(2));
        setTotalAmount(Number(totalAmount).toFixed(2))
        getAllVats(tempArray1)

        setNewInvoice((prevState)=>{
          prevState.items = tempArray1;
          return prevState
       })
        setHasChanges(!hasChanges);
    };

    const getAllVats = (array) => {
        let totalNoVAT = 0;
        let totalVat6 = 0;
        let totalVat20 = 0;
        array.map((item) => {
            totalNoVAT += Number(item.originalPrice * item.quantity);
            switch (item.product.vat) {
                case 1:
                    totalVat6 += Number((item.finalPrice - item.originalPrice) * item.quantity)
                    break;
                case 2:
                    totalVat20 += Number((item.finalPrice - item.originalPrice) * item.quantity)
                    break;
                default:
                    break;
            }
        });
        setTotalVat6(Number(totalVat6.toFixed(2)));
        setTotalVat20(Number(totalVat20.toFixed(2)));
        setTotalAmountNoVat(totalNoVAT);
    }

    const correctInvoice = async () => {
        let negativeItems = [];
        newInvoice.items?.map((item) => {
            negativeItems.push({
                productId: item.productId,
                productName: item.product.name,
                quantity: item.quantity * -1,
                finalPrice: item.finalPrice,
                originalPrice: item.originalPrice,
                barcode: item.product?.barcode,
                sellingUnitId:item.proudct?.sellingUnitId,
                vat:(item.vat === 0) ? 0 : (item.vat === 1) ? 6.00 : (item.vat === 2) ? 20.00 : 0
            })
        });
        const invoiceObject = {
            clientId: newInvoice.clientId,
            branchId: newInvoice.branchId,
            userId: newInvoice.userId,
            totalAmount: Number(totalAmount)*-1,
            totalVat: Number(totalVat)*-1,
            totalAmountNoVAT: totalAmountNoVat*-1,
            totalVat6: totalVat6*-1,
            totalVat20: Number(totalVat20)*-1,
            paymentMethod: 1,
            isReturn: true,
            //NSLF: newInvoice.NSLF,
            NSLF: '',
            invoiceItems: [...negativeItems],
            date: dateFormatInvoiceFiscalized(),
            operatorCode:initialState?.currentUser.operatorCode,
            description: 'Fature e korrigjuar'
        }
        try{
            const result = await handleCorrectiveInvoice(invoiceObject);
            //Handle MoneyDeposit Update
             const moneyDepositId = JSON.parse(localStorage.getItem('deposit')).id;
             reduceAmountFromDeposit(moneyDepositId, Number(totalAmount));
             props.onFinish(result.data, invoiceObject.invoiceItems);
        }catch(error){
            console.log('Error', error);
            props.onError();
        }
    }

    return (
       <>
         <Box className={styles.box}>
             <div className={styles.centerDiv}>
                 <span className={styles.title}>FATURË KORRIGJUESE</span><br/>
                 <span className={styles.infoText}>*Në këtë faturë mbani produktet që do të kthehen/zbriten nga fatura origjinale</span><br/>
             </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
                            <TableHead className={styles.tableHead}>
                                <TableRow>
                                    <TableCell className={styles.tableHeadCell}>{t("no")}</TableCell>
                                    <TableCell className={styles.tableHeadCell}>{t("product")}</TableCell>
                                    <TableCell className={styles.tableHeadCell}>{t("stock")}</TableCell>
                                    <TableCell className={styles.tableHeadCell}>{t("price")}</TableCell>
                                    <TableCell className={styles.tableHeadCell}>{t("total")}</TableCell>
                                    <TableCell className={styles.tableHeadCell}>{t("delete")}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {newInvoice?.items.map((item, index) => {
                                    let oldIndex = 0;
                                    props?.data.items.map((product, i) => {
                                        (product.id === item.id ? oldIndex = i : "")
                                    });
                                    return(
                                        <>
                                        <TableRow
                                        key={item.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell className={styles.tableRowCell}>{index+1}</TableCell>
                                        <TableCell className={styles.tableRowCell}>{item.product.name}</TableCell>
                                        <TableCell className={styles.tableRowCellQuantity}>
                                            {item.quantity == 1 ? (
                                                <>
                                                  <button className={styles.emptyButton} ></button>
                                                </>
                                            ) : (
                                               <>                                 
                                                <button
                                                    className={styles.valueButton}
                                                    onClick={() => {
                                                        handleDelete(item, item.quantity-1);
                                                    }}
                                                >
                                                    -
                                                </button>
                                               </>
                                            )}
                                            {item.quantity*-1}
                                            {item.quantity < props?.data.items[oldIndex].quantity ? (
                                                <>                                 
                                                <button
                                                    className={styles.addButton}
                                                    onClick={() => {
                                                        handleDelete(item, item.quantity+1);
                                                    }}
                                                >
                                                    +
                                                </button>
                                               </>
                                            ) : (
                                                <>
                                                  <button className={styles.emptyButton} ></button>
                                               </>
                                            )}
                                        </TableCell>
                                        <TableCell className={styles.tableRowCell}>{item.finalPrice.toFixed(2)}</TableCell>
                                        <TableCell className={styles.tableRowCell}>{Number(item.finalPrice*item.quantity*-1).toFixed(2)}</TableCell>
                                        <TableCell className={styles.tableRowCell}>
                                        <IconButtonComponent
                                                style={{
                                                backgroundColor: '#f05050',
                                                marginRight: '10px',
                                                }}
                                                icon={<DeleteForeverIcon />}
                                                iconColor={{ color: 'white' }}
                                                text={t('delete')}
                                                onClick={() => handleDelete(item)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    </>
                                    )
                                })}
                            </TableBody>
                            <TableHead className={styles.tableFooter}>
                                <TableRow>
                                    <TableCell className={styles.tableFootCell}>{t("products")}: {newInvoice.items.length}</TableCell>
                                    <TableCell className={styles.tableFootCell}>{t("priceWithoutVat")}: {(totalAmountNoVat*-1).toFixed(2)}</TableCell>
                                    <TableCell className={styles.tableFootCell}>{t("priceWithVat")}: {Number(totalAmount*-1).toFixed(2)}</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
             <div className={styles.buttonDiv}>
                <ButtonComponent
                    title="Korrigjo"
                    lightColor="rgb(18, 172, 122)"
                    addIcon={false}
                    onClick={correctInvoice}
                />
             </div>
          </Box>
       </>
    );
};

export default CorrectiveInvoice;