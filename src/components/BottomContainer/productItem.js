import { useEffect, useState } from 'react';
import styles from '../BottomContainer/bottomStyles.css'

const BottomContainer = (props) => {
    const [product, setProduct] = useState(props.item);
    const [quantity, setProductQuantity] = useState(1);
    const [stopAdding, setStopAdding] = useState(true);

    useEffect(() => {
        const arrayProduct = (props.invoiceList?.filter(item => item.id === props.item.id));
        (arrayProduct[0]?.stockCheck ? (
            (arrayProduct[0]?.quantity >= Number(product.stock).toFixed(0) ? (setStopAdding(true)) : (setStopAdding(false)))
        ) : (
            (Number(product.stock).toFixed(0) == 0 ? (() => {setStopAdding(true)}) : (setStopAdding(false)))
          ));
        //((props.invoiceList?.filter(item => item.id === props.item.id)).length >= 1 ? null : setStopAdding(false));
    }, [props.invoiceList], props.item);


    const handleProductClick = () => {
        const isExisting = ((props.invoiceList?.filter(item => item.id === product.id)).length >= 1 ? true : false);
        const arrayProduct = (props.invoiceList?.filter(item => item.id === product.id));
        if (product.stockCheck) {
            if (isExisting) {
                if (arrayProduct[0].quantity >= Number(product.stock).toFixed(0)) {
                    setStopAdding(true);
                } else {
                    setProductQuantity(arrayProduct[0].quantity + 1);
                    props.addToList(product, arrayProduct[0].quantity + 1);
                }
            } else {
                setProductQuantity(1);
                (Number(product.stock) == 1 ? (setStopAdding(true)) : (props.addToList(product, 1)));
            }
        } else {
            if (isExisting) {
                setProductQuantity(arrayProduct[0].quantity + 1);
                props.addToList(product, arrayProduct[0].quantity + 1);
            } else {
                setProductQuantity(1);
                (Number(product.stock) == 1 ? (setStopAdding(true)) : (props.addToList(product, 1)));
            }
        }

    }

    return (
        <>
            <p className={stopAdding ? (styles.productBlockDisabled) : (styles.productBlock)} onClick={() => { handleProductClick() }}>
                <span className={styles.details}><b>{props.index + 1}) </b></span>
                <span className={styles.details}><b>{props.item.name}</b></span>
                <span className={styles.details}>Përshkrimi: {props.item.description}</span>
                <span className={styles.details}>Çmimi: {Number(props.item.price).toFixed(2)} LEK</span>
                <span className={styles.details}>Stoku: {props.item.stock}</span>
                <span className={styles.details}>Barkodi: {props.item.barcode}</span>
            </p>
        </>

    );
};

export default BottomContainer;
