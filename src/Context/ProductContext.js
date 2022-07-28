import { createContext, useContext, useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct, returnProductWithBarcode, getProductsByClientId } from "../services/product";
import { useModel } from 'umi';
import { getClientId } from "../helpers/getClientId";

const ProductContext = createContext({});

const ProductProvider = (props) => {
    const { initialState } = useModel('@@initialState');
    const [productList, setProductList] = useState([]);

    const [productListCopy, setProductListCopy] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getProductsList();
    }, [initialState?.currentUser])

    const getProductsList = async (query = {}) => {
        setIsLoading(true);
        try {
            let products = [];
            let productCopy = [];
            if (initialState?.currentUser?.branchId !== 0){
                products = await getProducts(initialState?.currentUser?.branchId, query);
                productCopy = await getProducts(initialState?.currentUser?.branchId, {});
                setProductListCopy(productCopy.data);
            }else{
                products = await getProductsByClientId(getClientId(initialState?.currentUser), query);
                productCopy = await getProductsByClientId(getClientId(initialState?.currentUser), {});
                setProductListCopy(productCopy.data);
            }if (products.statusCode === 200) {
                const dataFromLocalStorage = JSON.parse(localStorage.getItem("item"));
                if(dataFromLocalStorage.length){
                        const tmp = [];
                        dataFromLocalStorage.map((el,index)=>{
                            products.data.filter((pr,prIndex)=>{
                                if(el.id === pr.id){
                                   pr.stock = Number(pr.stock)- el.quantity;
                                   tmp.push(pr);
                                }
                            });
                        });
                        setProductList(products.data);
                } else{
                    setProductList(products.data);
                }
                
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    }

    const productToCreate = async (data) => {
        try {
            const result = await createProduct(getClientId(initialState?.currentUser), data);
            getProductsList();
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const productToUpdate = async (data) => {
        try {
            const result = await updateProduct(getClientId(initialState?.currentUser), data);
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

    const values = { productList,productListCopy, setProductListCopy,setProductList, productToCreate, productToUpdate, productToDelete, getProductsList, isLoading, filteredProduct, getProductByBarcode }

    return (
        <ProductContext.Provider value={values}>
            {props.children}
        </ProductContext.Provider>
    )
}

const useContextProduct = () => { return useContext(ProductContext) }

export { ProductProvider, useContextProduct }