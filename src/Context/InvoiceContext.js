import { createContext, useContext, useEffect, useState } from "react";
import { getProductByBarcode } from './../services/product';
import { createInvoice, getInvoices } from "../services/invoice";
import { useModel } from 'umi';
const InvoiceContext = createContext({});

const InvoiceProvider = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [listedInvoiceProducts, setListedInvoiceProducts] = useState([]);
    const [totalPriceVAT, setTotalPriceVAT] = useState(0); //The value of total price with VAT
    const [totalPriceNoVAT, setTotalPriceNoVAT] = useState(0); //The value of total price without VAT
    const [totalVAT, setTotalVAT] = useState(0); //The value of total VAT
    const [activeInvoice, setActiveInvoice] = useState("active");  //The tab of invoices opened, values are active or pending
    const { initialState } = useModel('@@initialState');
    const [pendingInvoices, setPendingInvoices] = useState([]);
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
    const [invoiceFinalObject, setInvoiceFinalObject] = useState({});
    const [filteredBarcodeProduct, setFilteredBarcodeProduct] = useState({});

    useEffect(() => {
        // console.log("initialState?.currentUser?", initialState?.currentUser);
        getListOfInvoices("pending");
    }, [initialState?.currentUser]);


    //Method to add products in the invoice list
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
                // branchId: product.branch.id,
                description: product.description,
                price: product.price,
                originalPrice: (product.price - vatValueProduct),
                quantity: productQuantity,
                stock: product.stock,
                stockCheck: product.stockCheck,
                vat: product.vat,
            }
            getTotalPriceWithoutVAT();
            setListedInvoiceProducts((prevState) => [...prevState, newProduct]);
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
        let totalVat= 0;
        listedInvoiceProducts?.map((product) => {
            totalVat += Number((product.price - product.originalPrice)* product.quantity);
        });
        setTotalVAT(totalVat);
        return totalVat;
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

    const createPendingInvoice = async () => {
        const data = invoiceFinalObject;
        data.status = "pending";
        data.quantity = listedInvoiceProducts?.length;
        try {
            const response = await createInvoice(data);
            getListOfInvoices("pending");
        } catch (error) {
            console.log(error);
        }
        setActiveInvoice("pending");
    }

    const updateInvoiceToActive = async (invoice) => {
        setActiveInvoice("active");
        const items = invoice.items;
        delete invoice["items"];
        invoice.invoiceItems = items;
        invoice.status = "active";
        try {
            const response = await createInvoice(invoice);
            getListOfInvoices("pending");
        } catch (error) {
            console.log(error);
        }
    }

    const getListOfInvoices = async (status) => {
        try {
            const response = await getInvoices(initialState?.currentUser?.branchId, status);
            if (response.statusCode == 200) {
                setPendingInvoices(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Method that returns the full invoice object
    const returnInvoiceObject = () => {
        const invoiceItemsArray = [];
        listedInvoiceProducts?.map((item) => {
            invoiceItemsArray.push({
                productId: item.id,
                quantity: item.quantity,
                finalPrice: item.price,
                originalPrice: item.originalPrice,
            })
        });
        const invoiceObject = {
            clientId: initialState?.currentUser.clientId,
            branchId: initialState?.currentUser.branchId,
            totalAmount: totalPriceVAT,
            totalVat: getTotalVAT(),
            paymentMethod: 1,
            invoiceItems: [...invoiceItemsArray]
        }
        setInvoiceFinalObject(invoiceObject);
    }

    const values = { isLoading, addToInvoiceList, listedInvoiceProducts, removeProductFromInvoiceList, deleteInvoice, totalPriceVAT, 
        getTotalPriceWithVAT, totalPriceNoVAT, getTotalPriceWithoutVAT, filteredBarcodeProduct, getProductBarcode, invoiceFinalObject, 
        returnInvoiceObject, activeInvoice, setActiveInvoice, createPendingInvoice, pendingInvoices, updateInvoiceToActive }

    return (
        <InvoiceContext.Provider value={values}>
            {props.children}
        </InvoiceContext.Provider>
    )
}

const useInvoiceContext = () => { return useContext(InvoiceContext) }

export { InvoiceProvider, useInvoiceContext }