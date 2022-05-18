import { createContext, useContext, useState, useEffect } from "react";
import { createCategory, getAllCategory, updateCategory, deleteCategory, getAllCategoryByClientId } from "../services/category";
import { useModel } from 'umi';

const CategoryContext = createContext({});

const CategoryProvider = (props) => {
    const { initialState } = useModel('@@initialState');

    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        if (initialState?.currentUser?.clientId) getCategoryList();
    }, [initialState?.currentUser]);

    const getCategoryList = async () => {
        setIsLoading(true);
        try {
            let category = [];
            if (initialState?.currentUser?.branchId !== 0)
                category = await getAllCategory(initialState?.currentUser?.branchId);
            else category = await getAllCategoryByClientId(initialState?.currentUser?.clientId);
            if (category.statusCode === 200) {
                setCategoryList(category.data);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    const categoryToCreate = async (data) => {
        try {
            const result = await createCategory(initialState?.currentUser?.clientId, data);
            getCategoryList();
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const categoryToUpdate = async (data) => {
        try {
            const result = await updateCategory(initialState?.currentUser?.branchId, data);
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

    const values = { categoryToCreate, categoryList, setCategoryList, categoryToUpdate, categoryToDelete, isLoading };

    return (
        <CategoryContext.Provider value={values}>
            {props.children}
        </CategoryContext.Provider>
    )
};
const useCategoryContext = () => { return useContext(CategoryContext) }

export { CategoryProvider, useCategoryContext }