import { createContext, useContext, useEffect, useState } from "react";
import { getProductByBarcode } from '../services/product';
import { getAllBranch } from '../services/branchList';
import { submitInvoice } from '../services/invoice';
import { useModel } from 'umi';

const InvoiceContext = createContext({});

const InvoiceProvider = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [listedInvoiceProducts, setListedInvoiceProducts] = useState([]);
    const [totalPriceVAT, setTotalPriceVAT] = useState(0); //The value of total price with VAT
    const [totalAmountNoVAT, settotalAmountNoVAT] = useState(0); //The value of total price without VAT
    const [totalVAT, setTotalVAT] = useState(0); //The value of total VAT
    const [totalVat6, settotalVat6] = useState(0); //The value of total 6% VAT
    const [totalVat20, settotalVat20] = useState(0); //The value of total 20% VAT
    const { initialState } = useModel('@@initialState');
    const [invoiceFinalObject, setInvoiceFinalObject] = useState({});
    const [filteredBarcodeProduct, setFilteredBarcodeProduct] = useState({});
    const [couponObject, setCouponObject] = useState({});

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
        settotalAmountNoVAT(0);
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
        let totalVat6 = 0;
        let totalVat20 = 0;
        listedInvoiceProducts?.map((product) => {
            totalNoVAT += Number(product.originalPrice * product.quantity);
            switch (product.vat) {
                case 1:
                    totalVat6 += Number((product.price - product.originalPrice) * product.quantity)
                    break;
                case 2:
                    totalVat20 += Number((product.price - product.originalPrice) * product.quantity)
                    break;
                default:
                    break;
            }
        });

        settotalVat6(Number(totalVat6.toFixed(2)));
        settotalVat20(Number(totalVat20.toFixed(2)));
        settotalAmountNoVAT(totalNoVAT);
    }

    //Method that calculates VAT value per invoice
    const getTotalVAT = () => {
        let totalVat = 0;
        listedInvoiceProducts?.map((product) => {
            totalVat += Number((product.price - product.originalPrice) * product.quantity);
        });
        setTotalVAT(Number(totalVat).toFixed(2));
        return (totalVat).toFixed(2);
    }

    //Method that filters product by barcode
    const getProductBarcode = async (barcode = "") => {
        try {
            const result = await getProductByBarcode(barcode, initialState?.currentUser?.branchId);
            if (result.statusCode === 200) {
                setFilteredBarcodeProduct(result.data);
                return result.data;
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Method that returns the full invoice object
    const returnInvoiceObject = async (shouldPost = true, invoiceDescription = "", invoiceMessage = "") => {
        const invoiceItemsArray = [];
        listedInvoiceProducts?.map((item) => {
            invoiceItemsArray.push({
                productId: item.id,
                productName: item.name,
                quantity: item.quantity,
                finalPrice: item.price,
                originalPrice: item.originalPrice,
            })
        });
        const invoiceObject = {
            clientId: initialState?.currentUser.clientId,
            branchId: initialState?.currentUser.branchId,
            totalAmount: totalPriceVAT,
            totalVat: Number(getTotalVAT()),
            totalAmountNoVAT: totalAmountNoVAT,
            totalVat6: totalVat6,
            totalVat20: totalVat20,
            paymentMethod: 1,
            description: String(invoiceDescription),
            message: invoiceMessage,
            invoiceItems: [...invoiceItemsArray]
        }
        setInvoiceFinalObject(invoiceObject);
        if(shouldPost) await postInvoice(invoiceObject);
    }

    //POST method to register Invoice DB
    const postInvoice = async (invoiceObject) => {
        //Add post method for invoice
        const response = await submitInvoice(invoiceObject);
        const invoiceData = response.data;

        let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date());
        let paymentMethodType = "";
        switch (invoiceObject.paymentMethod) {
            case 1:
                paymentMethodType = "CASH"
                break;

            case 2:
                paymentMethodType = "CARD"
                break;

            default:
                paymentMethodType = "CASH"
                break;
        }
        let couponGenerateObject = {
            invoiceCode: invoiceData.invoiceCode,
            clientName: invoiceData.client.name,
            clientNUIS: invoiceData.client.NUIS,
            clientAddress: invoiceData.client.address,
            dateTime: String(date), //will be returned from post response
            branchCode: invoiceData.branch.code, //TODO
            operatorCode: initialState?.currentUser.operatorCode,
            paymentMethod: paymentMethodType,
            productList: [...invoiceObject.invoiceItems],
            totalAmountNoVAT: (invoiceObject.totalAmountNoVAT).toFixed(2),
            totalVat6: (invoiceObject.totalVat6).toFixed(2),
            totalVat20: (invoiceObject.totalVat20).toFixed(2),
            totalAmount: (invoiceObject.totalAmount).toFixed(2),
            nivf: "59c5cc1a-126e-258j-a789-err78456ls1b", //will be returned from post response
            nslf: "DE0495ASDF562VCS94F36565942S9I456", //will be returned from post response
            message: invoiceObject.message,
        }
        setCouponObject(couponGenerateObject);
    }

    const values = { isLoading, addToInvoiceList, listedInvoiceProducts, removeProductFromInvoiceList, deleteInvoice, totalPriceVAT, getTotalPriceWithVAT, totalAmountNoVAT, getTotalPriceWithoutVAT, filteredBarcodeProduct, getProductBarcode, invoiceFinalObject, returnInvoiceObject, deleteInvoice, couponObject }

    return (
        <InvoiceContext.Provider value={values}>
            {props.children}
        </InvoiceContext.Provider>
    )
}


const useInvoiceContext = () => { return useContext(InvoiceContext) }

export { InvoiceProvider, useInvoiceContext }