import { createContext, useContext, useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../services/product";

const ProductContext = createContext({});

const ProductProvider = (props) => {
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getProductsList();
    }, [])

    const getProductsList = async () => {
        setIsLoading(true);
        try {
            const products = await getProducts();
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
            const result = await createProduct(data);
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

    const values = { productList, setProductList, productToCreate, productToUpdate, productToDelete, isLoading }

    return (
        <ProductContext.Provider value={values}>
            {props.children}
        </ProductContext.Provider>
    )
}

const useContextProduct = () => { return useContext(ProductContext) }

export { ProductProvider, useContextProduct }