import { createContext , useContext ,useEffect , useState } from "react";
import {allProduct} from "../services/product/index";

const ProductContext = createContext({});
const ProductProvider = (props) => {
    const [productList,setProductList] = useState([]);

    useEffect( async()=>{
        try{
            const products = await allProduct();
            if(products.statusCode === 200){
                setProductList(products.data)
            }
        }catch(error){
            console.log("useEffect---error-----",error)
        }
    },[])

    const values = {productList,setProductList}
    return(
       <ProductContext.Provider value={values}>
            {props.children}
       </ProductContext.Provider>
    )
}
const useContextProduct = () => { return useContext(ProductContext) }
export {ProductProvider,useContextProduct}