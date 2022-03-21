import { createContext, useContext, useState, useEffect } from "react";
import { createCategory , getAllCategory, updateCategory, deleteCategory } from "../services/category";

const CategoryContext = createContext({});

const CategoryProvider = (props) => {
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
       getCategoryList();
    }, []);

    const getCategoryList = async() => {
        setIsLoading(true);
        try {
            const category = await getAllCategory();
            if (category.statusCode === 200) {
                setCategoryList(category.data);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    const categoryToCreate = async(data) =>{
        try{
            const result = await createCategory(data);
            getCategoryList();
            return result;
        }catch(error){
            console.log(error);
        }
    }

    const categoryToUpdate = async (data) => {
        console.log("data--context---",data)
        try {
            const result = await updateCategory(data);
            getCategoryList()
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const categoryToDelete = async (id) => {
        try {
            setCategoryList((prevState) => {
                const newState = prevState.filter((el) => el.id !== id);
                return [...newState]
            });
            const result = await deleteCategory(id);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const values = {categoryToCreate,categoryList, setCategoryList, categoryToUpdate, categoryToDelete};

    return (
        <CategoryContext.Provider value={values}>
            {props.children}
        </CategoryContext.Provider>
    )
};
const useCategoryContext = () => { return useContext(CategoryContext) }

export { CategoryProvider, useCategoryContext }