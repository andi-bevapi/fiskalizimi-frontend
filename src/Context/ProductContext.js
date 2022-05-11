import { createContext, useContext, useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct, returnProductWithBarcode, getProductsByClientId } from "../services/product";
import { useModel } from 'umi';

const ProductContext = createContext({});

const ProductProvider = (props) => {
    const { initialState } = useModel('@@initialState');
    const [productList, setProductList] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (initialState?.currentUser?.clientId) getProductsList();
    }, [initialState?.currentUser])

    const getProductsList = async (query = {}) => {
        setIsLoading(true);
        try {
            let products = [];
            if (initialState?.currentUser?.branchId !== 0)
                products = await getProducts(initialState?.currentUser?.branchId, query);
            else products = await getProductsByClientId(initialState?.currentUser?.clientId, query);
            if (products.statusCode === 200) {
                setProductList(products.data);
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    }

    const productToCreate = async (data) => {
        try {
            const result = await createProduct(initialState?.currentUser?.clientId, data);
            getProductsList();
            return result;
        } catch (error) {
            console.log(error);
        }
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

    const productToDelete = async (id) => {
        try {
            const result = await deleteProduct(id);
            setProductList((prevState) => {
                const list = prevState.filter((el) => el.id !== id);
                return [...list];
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const getProductByBarcode = async (barcode) => {
        try {
            const result = await returnProductWithBarcode(barcode);
            if(result.statusCode == 200){
                setFilteredProduct(result.data);
                return result.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const values = { productList, setProductList, productToCreate, productToUpdate, productToDelete, getProductsList, isLoading, filteredProduct, getProductByBarcode }

    return (
        <ProductContext.Provider value={values}>
            {props.children}
        </ProductContext.Provider>
    )
}

const useContextProduct = () => { return useContext(ProductContext) }

export { ProductProvider, useContextProduct }