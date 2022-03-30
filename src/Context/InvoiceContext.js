import { createContext, useContext, useEffect, useState } from "react";
import { getProductByBarcode } from './../services/product';
import { getAllBranch } from './../services/branchList';
import { useModel } from 'umi';
const InvoiceContext = createContext({});

const InvoiceProvider = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [listedInvoiceProducts, setListedInvoiceProducts] = useState([]);
    const [totalPriceVAT, setTotalPriceVAT] = useState(0); //The value of total price with VAT
    const [totalPriceNoVAT, setTotalPriceNoVAT] = useState(0); //The value of total price without VAT
    const [totalVAT, setTotalVAT] = useState(0); //The value of total VAT
    const [totalVAT6, setTotalVAT6] = useState(0); //The value of total 6% VAT
    const [totalVAT20, setTotalVAT20] = useState(0); //The value of total 20% VAT
    const { initialState } = useModel('@@initialState');
    const [invoiceFinalObject, setInvoiceFinalObject] = useState({});
    const [filteredBarcodeProduct, setFilteredBarcodeProduct] = useState({});
    const [couponObject, setCouponObject] = useState({});
    const [clientData, setClientData] = useState();

    useEffect(() => {
        console.log("initialState?.currentUser?", initialState?.currentUser);
    }, [initialState?.currentUser]);


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
        let totalVAT6 = 0;
        let totalVAT20 = 0;
        listedInvoiceProducts?.map((product) => {
            totalNoVAT += Number(product.originalPrice * product.quantity);
            switch (product.vat) {
                case 1:
                    totalVAT6 += Number((product.price - product.originalPrice) * product.quantity)
                    break;
                case 2:
                    totalVAT20 += Number((product.price - product.originalPrice) * product.quantity)
                    break;
                default:
                    break;
            }
        });

        setTotalVAT6(Number(totalVAT6.toFixed(2)));
        setTotalVAT20(Number(totalVAT20.toFixed(2)));
        setTotalPriceNoVAT(totalNoVAT);
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

    //Method that gets information about current client
    const getClientData = async () => {
        try {
            const result = await getAllBranch(initialState?.currentUser?.branchId);
            if (result.statusCode === 200) {
                setClientData(result.data[0]);
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Method that returns the full invoice object
    const returnInvoiceObject = (invoiceDescription, invoiceMessage) => {
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
            totalPriceNoVAT: totalPriceNoVAT,
            totalVAT6: totalVAT6,
            totalVAT20: totalVAT20,
            paymentMethod: 1,
            description: String(invoiceDescription),
            message: invoiceMessage,
            invoiceItems: [...invoiceItemsArray]
        }
        setInvoiceFinalObject(invoiceObject);
        postInvoice(invoiceObject);
    }

    //POST method to register Invoice DB
    const postInvoice = (invoiceObject) => {
        //Add post method for invoice
        //get result and create object to generate coupon
        getClientData();
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
            invoiceCode: "20850/2022/hj025df663", //will be returned from post response
            clientName: clientData?.name, //may change
            clientNUIS: "E12050785",  //TODO
            clientAddress: clientData?.city, //may change
            dateTime: String(date), //will be returned from post response
            branchCode: "hj025df663", //TODO
            operatorCode: initialState?.currentUser.operatorCode,
            paymentMethod: paymentMethodType,
            productList: [...invoiceObject.invoiceItems],
            totalPriceNoVAT: (invoiceObject.totalPriceNoVAT).toFixed(2),
            totalVAT6: (invoiceObject.totalVAT6).toFixed(2),
            totalVAT20: (invoiceObject.totalVAT20).toFixed(2),
            totalAmount: (invoiceObject.totalAmount).toFixed(2),
            nivf: "59c5cc1a-126e-258j-a789-err78456ls1b", //will be returned from post response
            nslf: "DE0495ASDF562VCS94F36565942S9I456", //will be returned from post response
            message: invoiceObject.message,
        }
        setCouponObject(couponGenerateObject);
    }

    const values = { isLoading, addToInvoiceList, listedInvoiceProducts, removeProductFromInvoiceList, deleteInvoice, totalPriceVAT, getTotalPriceWithVAT, totalPriceNoVAT, getTotalPriceWithoutVAT, filteredBarcodeProduct, getProductBarcode, invoiceFinalObject, returnInvoiceObject, deleteInvoice, couponObject }

    return (
        <InvoiceContext.Provider value={values}>
            {props.children}
        </InvoiceContext.Provider>
    )
}


const useInvoiceContext = () => { return useContext(InvoiceContext) }

export { InvoiceProvider, useInvoiceContext }