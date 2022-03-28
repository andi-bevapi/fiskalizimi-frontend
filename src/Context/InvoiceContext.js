import { createContext, useContext, useEffect, useState } from "react";

const InvoiceContext = createContext({});

const InvoiceProvider = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [listedInvoiceProducts, setListedInvoiceProducts] = useState([]);
    const [totalPriceVAT, setTotalPriceVAT] = useState(0); //The value of total price with VAT
    const [totalPriceNoVAT, setTotalPriceNoVAT] = useState(0); //The value of total price without VAT
    const [totalVAT, setTotalVAT] = useState(0); //The value of total VAT
    const vatObject = [
        {
            type: 0,
            name: "përjashtuar nga TVSH-ja",
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
        let vatValueProduct = 0;
        switch (product.vat) {
            case 1:
                vatValueProduct = Number(product.price * 0.06)
                break
            case 2:
                vatValueProduct = Number(product.price * 0.2)
                break
            default:
                vatValueProduct = 0
                break
        }
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
            getTotalPriceWithoutVAT();
        } else { //if it doesn't exist add new product at the invoice list
            let newProduct = {
                id: product.id,
                name: product.name,
                unitSellingId: product.sellingUnitId,
                branchId: product.branch.id,
                description: product.description,
                price: product.price,
                originalPrice: (product.price - vatValueProduct),
                quantity: productQuantity,
                stock: product.stock,
                stockCheck: product.stockCheck,
                vat: product.vat,
            }
            getTotalPriceWithoutVAT();
            setListedInvoiceProducts([...listedInvoiceProducts, newProduct]);
        }
        setIsLoading(false);
        //getTotalVAT();
    }

    //Method to remove a product in the invoice list
    const removeProductFromInvoiceList = (product) => {
        const newArrayWithoutSelectedProduct = listedInvoiceProducts?.filter(item => item.id !== product.id);
        setListedInvoiceProducts(newArrayWithoutSelectedProduct);
        getTotalPriceWithoutVAT();
        getTotalPriceWithVAT();
    }

    //Method to remove all products from the invoice list
    const deleteInvoice = () => {
        setIsLoading(true);
        setListedInvoiceProducts([]);
        setTotalPriceVAT(0);
        setTotalPriceNoVAT(0);
        setIsLoading(false);
    }

    //Method that calculates total price with VAT
    const getTotalPriceWithVAT = () => {
        let totalPriceVat = 0;
        listedInvoiceProducts?.map((item) => {
            totalPriceVat += Number(item.price * item.quantity);
        });
        setTotalPriceVAT(totalPriceVat);
    }

    //Method that calculates price depending on VAT value per product
    const getTotalPriceWithoutVAT = () => {
        let totalNoVAT = 0;
        listedInvoiceProducts?.map((product) => {
            totalNoVAT += Number(product.originalPrice * product.quantity);
        });
        setTotalPriceNoVAT(totalNoVAT);
    }

    //Method that calculates VAT value per invoice
    const getTotalVAT = () => {
        let totalVAT = 0;
        listedInvoiceProducts?.map((product) => {
            totalVAT += Number((product.price - product.originalPrice)* product.quantity);
        });
        setTotalVAT(totalVAT);
    }

    const values = { isLoading, addToInvoiceList, listedInvoiceProducts, removeProductFromInvoiceList, deleteInvoice, totalPriceVAT, getTotalPriceWithVAT, totalPriceNoVAT, getTotalPriceWithoutVAT }

    return (
        <InvoiceContext.Provider value={values}>
            {props.children}
        </InvoiceContext.Provider>
    )
}

const useInvoiceContext = () => { return useContext(InvoiceContext) }

export { InvoiceProvider, useInvoiceContext }