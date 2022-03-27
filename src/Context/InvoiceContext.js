import { createContext, useContext, useEffect, useState } from "react";

const InvoiceContext = createContext({});

const InvoiceProvider = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [listedInvoiceProducts, setListedInvoiceProducts] = useState([]);
    const [totalPriceVAT, setTotalPriceVAT] = useState(0); //The value of total price with VAT
    const vatObject = [
        {
            type: 0,
            name: "TVSH tipi A,B,C,Ç",
            value: 0,
        },
        {
            type: 1,
            name: "TVSH 6%",
            value: 0,
        },
        {
            type: 2,
            name: "TVSH 20%",
            value: 0,
        },
        {
            type: 3,
            name: "pa TVSH",
            value: 0,
        },
    ]
    const [vatValues, setVATValues] = useState(vatObject); //Object with all VAT values and types
    

    //Method to products in the invoice list
    const addToInvoiceList = (product, productQuantity) => {
        setIsLoading(true);
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
            setListedInvoiceProducts([...newArrayUpdated]);
        } else { //if it doesn't exist add new product at the invoice list
            let newProduct = {
                ...product,
                quantity: productQuantity,
            }
            setListedInvoiceProducts([...listedInvoiceProducts, newProduct]);
        }
        setIsLoading(false);
        //getTotalPriceWithVAT();
    }

    //Method to remove a product the invoice list
    const removeProductFromInvoiceList = (product) => {
        const newArrayWithoutSelectedProduct = listedInvoiceProducts?.filter(item => item.id !== product.id);
        setListedInvoiceProducts(newArrayWithoutSelectedProduct);
        getTotalPriceWithVAT();
    }

    //Method to remove all products from the invoice list
    const deleteInvoice = () => {
        setIsLoading(true);
        setListedInvoiceProducts([]);
        getTotalPriceWithVAT();
        setIsLoading(false);
    }

    //Method that calculates total price with VAT
    const getTotalPriceWithVAT = () => {
        let totalPriceVar = 0;
        listedInvoiceProducts?.map((item) => {
            totalPriceVar += Number(item.price*item.quantity);
        });
        setTotalPriceVAT(totalPriceVar);
    }

    //Method that calculates price depending on VAT value per product
    // const setVATValuesInvoice = () => {

    // }

    const values = { isLoading, addToInvoiceList, listedInvoiceProducts, removeProductFromInvoiceList, deleteInvoice, totalPriceVAT, getTotalPriceWithVAT }

    return (
        <InvoiceContext.Provider value={values}>
            {props.children}
        </InvoiceContext.Provider>
    )
}

const useInvoiceContext = () => { return useContext(InvoiceContext) }

export { InvoiceProvider, useInvoiceContext }