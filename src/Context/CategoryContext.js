import { createContext,useContext , useState , useEffect } from "react";
import { getAllCategory } from "../services/user/category";

const CategoryContext = createContext({});
const CategoryProvider = (props) =>{
    const [categoryList,setCategoryList] = useState([]);
    useEffect( async ()=>{
       try{
            const category = await getAllCategory();
            if(category.statusCode === 200){
                setCategoryList(category.data);
            }
       }catch(error){
           console.log("error----",error);
       }
    },[]);
    const values = {categoryList,setCategoryList};
   
    return(
        <CategoryContext.Provider value={values}>
            {props.children}
        </CategoryContext.Provider>
    )
};
const useCategoryContext = () => { return useContext(CategoryContext)}
export {CategoryProvider,useCategoryContext}