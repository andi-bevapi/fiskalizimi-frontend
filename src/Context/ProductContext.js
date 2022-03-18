import { createContext , useContext ,useEffect , useState } from "react";
import {allProduct , createProduct ,updateProduct , deleteProduct} from "../services/product/index";

const ProductContext = createContext({});
const ProductProvider = (props) => {
    const [productList,setProductList] = useState([]);

    useEffect( async()=>{
        try{
            const products = await allProduct();
            if(products.statusCode === 200){
                setProductList(products.data);
            }
        }catch(error){
            console.log("useEffect---error-----",error)
        }
    },[])

    const productToCreate = async () =>{
        console.log("productToCreate");
    }

    const productToUpdate = async(data) => {
       try{
         const result = await updateProduct(data);
         return result;
       }catch(error){
        console.log("error-----",error);
       }
    }

    const productToDelete = async(id) =>{
        try{
            const result = await deleteProduct(id);
            return result;
           }catch(error){
                console.log("error---",error);
           }
    }

    const values = {productList,setProductList,productToCreate,productToUpdate,productToDelete}
    return(
       <ProductContext.Provider value={values}>
            {props.children}
       </ProductContext.Provider>
    )
}
const useContextProduct = () => { return useContext(ProductContext) }
export {ProductProvider,useContextProduct}