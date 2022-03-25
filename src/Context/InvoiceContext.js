import { createContext, useContext, useEffect, useState } from "react";

const InvoiceContext = createContext({});

const InvoiceProvider = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [listedInvoiceProducts, setListedInvoiceProducts] = useState([]);

    const addToInvoiceList = (product, productQuantity) => {
        const isExisting = ((listedInvoiceProducts?.filter(item => item.id === product.id)).length >= 1 ? true : false); //check if product is already in the invoice list
        if (isExisting) {
            let productIndex = ""; //find the index of the repeated product
            listedInvoiceProducts?.map((item, index) => {
                (item.id === product.id ? productIndex = index : "")
            });
            const newArrayUpdated = Object.assign(listedInvoiceProducts, {
                ...listedInvoiceProducts,
                [productIndex]: { ...listedInvoiceProducts[productIndex], quantity: productQuantity }
            }); //create new array tha will only update the quantity of the selected product
            setListedInvoiceProducts(newArrayUpdated);
        } else { //if it doesn't exist add new product at the invoice list
            let newProduct = {
                ...product,
                quantity: productQuantity,
            }
            setListedInvoiceProducts([...listedInvoiceProducts, newProduct]);
        }
    }

    const removeProductFromInvoiceList = (product) => {
        const newArrayWithoutSelectedProduct = listedInvoiceProducts?.filter(item => item.id !== product.id);
        setListedInvoiceProducts(newArrayWithoutSelectedProduct);
    }

    const values = { isLoading, addToInvoiceList, listedInvoiceProducts, removeProductFromInvoiceList }

    return (
        <InvoiceContext.Provider value={values}>
            {props.children}
        </InvoiceContext.Provider>
    )
}

const useInvoiceContext = () => { return useContext(InvoiceContext) }

export { InvoiceProvider, useInvoiceContext }