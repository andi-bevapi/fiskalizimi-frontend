import { createContext, useContext, useEffect, useState } from "react";
import { getProductByBarcode, updateProduct } from '../services/product';
import { createInvoice, getInvoices, deleteInvoiceById } from "../services/invoice";
import {dateFormatInvoiceFiscalized} from "../helpers/formatDate";
import {moment} from "moment";

import { useModel } from 'umi';
import { useContextProduct } from './ProductContext';
import {useClientContext} from "./ClientContext";

const InvoiceContext = createContext({});

const InvoiceProvider = (props) => {
    const { productToUpdate, productToDelete, setProductList, productList } = useContextProduct();
    const { clientToGet } = useClientContext();

    const [isLoading, setIsLoading] = useState(false);
    const [listedInvoiceProducts, setListedInvoiceProducts] = useState([]);
    const [totalPriceVAT, setTotalPriceVAT] = useState(0); //The value of total price with VAT
    const [totalAmountNoVAT, settotalAmountNoVAT] = useState(0); //The value of total price without VAT
    const [totalVAT, setTotalVAT] = useState(0); //The value of total VAT
    const [activeInvoice, setActiveInvoice] = useState("active");  //The tab of invoices opened, values are active or pending
    const [totalVat6, settotalVat6] = useState(0); //The value of total 6% VAT
    const [totalVat20, settotalVat20] = useState(0); //The value of total 20% VAT
    const { initialState } = useModel('@@initialState');
    const [invoiceFinalObject, setInvoiceFinalObject] = useState({});
    const [filteredBarcodeProduct, setFilteredBarcodeProduct] = useState({});
    const [pendingInvoices, setPendingInvoices] = useState([]);
    const [couponObject, setCouponObject] = useState({});

    useEffect(() => {
        if (activeInvoice == "pending") getListOfInvoices("pending");
    }, [activeInvoice]);

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
            setProductList((prevState) => {


                let index = prevState.findIndex((el) => el.id == product.id);

               
                // if (listedInvoiceProducts[productIndex].quantity < productQuantity)
                //     prevState[index].stock = prevState[index].stock - 1;
                // else prevState[index].stock = prevState[index].stock + 1;

                
                if(listedInvoiceProducts[productIndex].quantity == productQuantity){
                    prevState[index].stock = Number(listedInvoiceProducts[productIndex].stock) - productQuantity
                } else if (listedInvoiceProducts[productIndex].quantity < productQuantity){
                    prevState[index].stock = prevState[index].stock - 1;
                }

                return [...prevState];
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
                barcode: product.barcode,
                sellingUnitId: product.sellingUnitId,
                categoryId: product.categoryId,
                supplierId: product.supplierId
            }
            getTotalPriceWithoutVAT();
            setListedInvoiceProducts((prevState) => [...prevState, newProduct]);
            setProductList((prevState) => {
                let index = prevState.findIndex((el) => el.id == product.id);
                prevState[index].stock = prevState[index].stock - 1;
                return [...prevState];
            });
        }
        setIsLoading(false);
    }

    //Method to remove a product in the invoice list
    const removeProductFromInvoiceList = (product) => {
        const productIndex = listedInvoiceProducts?.findIndex(item => item.id === product.id);
        setProductList((prevState) => {
            let index = prevState.findIndex((el) => el.id == product.id);
            prevState[index].stock = Number(prevState[index].stock) + Number(listedInvoiceProducts[productIndex].quantity);
            return [...prevState];
        });
        const newArrayWithoutSelectedProduct = listedInvoiceProducts?.filter(item => item.id !== product.id);
        setListedInvoiceProducts(newArrayWithoutSelectedProduct);
        getTotalPriceWithoutVAT();
        getTotalPriceWithVAT();
    }

    //Method to remove all products from the invoice list
    const deleteInvoice = () => {
        listedInvoiceProducts.map(product => {
            setProductList((prevState) => {

                let index = prevState.findIndex((el) => el.id == product.id);
                if(index === -1){
                    return [...prevState]
                }

                prevState[index].stock = prevState[index].stock + product.quantity;
                return [...prevState];
            });
        })
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

    const createPendingInvoice = async () => {
        const data = invoiceFinalObject;
        data.status = "pending";
        data.quantity = listedInvoiceProducts?.length;
        try {
            await createInvoice(data, initialState?.currentUser?.id);
            getListOfInvoices("pending");
        } catch (error) {
            console.log(error);
        }
        deleteInvoice();
    }

    const updateInvoiceToActive = async (invoice) => {
        setActiveInvoice("active");
        const items = invoice.items;
        delete invoice["items"];
        invoice.invoiceItems = items;
        invoice.status = "active";
        try {
            await createInvoice(invoice, initialState?.currentUser?.id);
            getListOfInvoices("pending");
        } catch (error) {
            console.log(error);
        }
    }

    const deletePendingInvoice = async (id) => {
        try {
            await deleteInvoiceById(id);
            setPendingInvoices((prevState) => {
                let newState = prevState.filter(item => item.id !== id);
                return [...newState];
            })
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
    const returnInvoiceObject = async (shouldPost = true, invoiceDescription = "", invoiceMessage = "") => {
        const invoiceItemsArray = [];
        listedInvoiceProducts?.map((item) => {
            invoiceItemsArray.push({
                productId: item.id,
                productName: item.name,
                quantity: item.quantity,
                finalPrice: item.price,
                originalPrice: item.originalPrice,
                barcode: item.barcode,
                sellingUnitId: item.sellingUnitId,
                vat: (item.vat === 0) ? 0 : (item.vat === 1) ? 6.00 : (item.vat === 2) ? 20.00 : 0
            })
        });

        const client = await clientToGet(initialState?.currentUser.clientId);
        const invoiceObject = {
            clientId: initialState?.currentUser.clientId,
            branchId: initialState?.currentUser.branchId,
            userId: initialState?.currentUser.id,
            totalAmount: totalPriceVAT,
            totalVat: Number(getTotalVAT()),
            totalAmountNoVAT: totalAmountNoVAT,
            totalVat6: totalVat6,
            totalVat20: totalVat20,
            paymentMethod: 1,
            description: String(invoiceDescription),
            message: invoiceMessage,
            invoiceItems: [...invoiceItemsArray],
            NSLF: "", //will be generated
            date: dateFormatInvoiceFiscalized(),
            operatorCode:initialState?.currentUser.operatorCode,
            nuis:client.data.NUIS
        }

        setInvoiceFinalObject(invoiceObject);
        if (shouldPost){
            try{
                await postInvoice(invoiceObject);
              } catch(err){
                throw new Error("Kjo fature nuk u fiskalizua", 409);
              }
        } 
        //await postInvoice(invoiceObject);
    }

    //POST method to register Invoice DB
    const postInvoice = async (invoiceObject) => {
        //Add post method for invoice
        const response = await createInvoice(invoiceObject, initialState?.currentUser?.id);
        const invoiceData = response?.data;

        //console.log("invoiceData-----",invoiceData);

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
            TRCCode: invoiceData.client.TCRCode,
            softCode: invoiceData.client.softCode,
            businessUnitCode: invoiceData.branch.businessUnitCode,
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
        updateProductsStock(couponGenerateObject.productList);
    }

    //Method that updates product stock after selling
    const updateProductsStock = (updatedroductsInvoice) => {
        let updatedStock = 0;
        (listedInvoiceProducts.map((product) => {
            updatedStock = updatedroductsInvoice?.filter(item => item.productId === product.id)[0];
                let body = {
                    id: product.id,
                    name: product.name, 
                    description: product.description,
                    price: product.price, 
                    barcode: product.barcode, 
                    vat: product.vat, 
                    supplierId: product.supplierId, 
                    stock: Number(product.stock - updatedStock.quantity), 
                    stockCheck: product.stockCheck, 
                    branchId: initialState?.currentUser?.branchId,
                    sellingUnitId: product.sellingUnitId, 
                    categoryId: product.categoryId, 
                    isActive: true,
                    isDeleted: false,
                }
                productToUpdate(body);
        }))
    }

    //Method that handles corrective invoice
    const handleCorrectiveInvoice = async (invoice) =>{
       try{
            const response = await createInvoice(invoice, initialState?.currentUser?.id);
            return response;
       }catch(error){
            console.log("ERROR", error)
       }

    }

    const values = { isLoading, addToInvoiceList, listedInvoiceProducts, removeProductFromInvoiceList, deleteInvoice, totalPriceVAT, 
        getTotalPriceWithVAT, totalAmountNoVAT, getTotalPriceWithoutVAT, filteredBarcodeProduct, getProductBarcode, invoiceFinalObject, 
        returnInvoiceObject, activeInvoice, setActiveInvoice, createPendingInvoice, pendingInvoices, setPendingInvoices, updateInvoiceToActive, deleteInvoice,
        couponObject, deletePendingInvoice, handleCorrectiveInvoice }

    return (
        <InvoiceContext.Provider value={values}>
            {props.children}
        </InvoiceContext.Provider>
    )
}


const useInvoiceContext = () => { return useContext(InvoiceContext) }

export { InvoiceProvider, useInvoiceContext }