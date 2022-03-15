import { createContext, useContext, useState, useEffect } from "react";
import { getAllCategory, updateCategory, deleteCategory } from "../services/category";

const CategoryContext = createContext({});

const CategoryProvider = (props) => {
    const [categoryList, setCategoryList] = useState([]);
    const [snackBarStatus, setSnackBarStatus] = useState({});
    useEffect(async () => {
        try {
            const category = await getAllCategory();
            if (category.statusCode === 200) {
                setCategoryList(category.data);
            } else {
                throw Error(JSON.stringify({ status: category.status, message: category.statusText }))
            }
        } catch (error) {
            const errorMessage = JSON.parse(error.message);
            setSnackBarStatus(errorMessage);
            return errorMessage;
        }
    }, []);


    const categoryToUpdate = async (data) => {
        try {
            const result = await updateCategory(data);
            return result;
        } catch (error) {
            console.log("error-----", error);
        }
    }

    const categoryToDelete = async (id) => {
        try {
            setCategoryList((prevState) => {
                const newState = prevState.filter((el) => el.id === id);
                return [...newState]
            });
            const result = await deleteCategory(id);
            return result;
        } catch (error) {
            console.log("error-----", error);
        }
    }

    const values = { categoryList, setCategoryList, categoryToUpdate, categoryToDelete, snackBarStatus };

    return (
        <CategoryContext.Provider value={values}>
            {props.children}
        </CategoryContext.Provider>
    )
};
const useCategoryContext = () => { return useContext(CategoryContext) }

export { CategoryProvider, useCategoryContext }