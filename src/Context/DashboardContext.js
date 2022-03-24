import { createContext, useContext, useEffect, useState } from "react";
import { getProducts, updateProduct } from "../services/product";

const DashboardContext = createContext({});

const DashboardProvider = (props) => {
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [listedInvoiceProducts, setListedInvoiceProducts] = useState([]);

    useEffect(() => {
        getProductsList();
    }, [])

    const getProductsList = async () => {
        setIsLoading(true);
        try {
            //HERE !!!! get banch ID
            const products = await getProducts(1);
            if (products.statusCode === 200) {
                setProductList(products.data);
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    }

    const productToUpdate = async (data) => {
        try {
            const result = await updateProduct(data);
            getProductsList();
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const addToInvocieList = async (product) => {
        setListedInvoiceProducts([...listedInvoiceProducts, product]);
     }

const values = { productList, listedInvoiceProducts, setProductList, productToUpdate, addToInvocieList, isLoading }
return (
    <DashboardContext.Provider value={values}>
        {props.children}
    </DashboardContext.Provider>
)
}

const useContextDashboard = () => { return useContext(DashboardContext) }

export { DashboardProvider, useContextDashboard }