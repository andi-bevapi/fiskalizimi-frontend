import { useContext, useEffect, createContext, useState } from "react";
import { getAllBranch, createBranchList, updateBranchList, deleteBranchList } from "../services/branchList/";

const BranchListContext = createContext({});

const BranchListProvider = (props) => {
    const [branchList, setBranchList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getBranchList();
    }, []);

    const getBranchList = async () => {
        setIsLoading(true);
        try {
            const result = await getAllBranch();
            if (result.statusCode === 200) {
                setBranchList(result.data);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    const branchListToUpdate = async (data) => {
        try {
            const result = await updateBranchList(data);
            getBranchList()
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const branchListToDelete = async (id) => {
        try {
            setBranchList((prevState) => {
                const newState = prevState.filter((el) => el.id !== id);
                return [...newState]
            });
            const result = await deleteBranchList(id);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const branchListToCreate = async (data) => {
        try {
            const result = await createBranchList(data);
            getBranchList();
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const values = { branchList, setBranchList, isLoading, branchListToCreate, branchListToUpdate, branchListToDelete };

    return (
        <BranchListContext.Provider value={values}>
            {props.children}
        </BranchListContext.Provider>
    )
}

const useBranchListContext = () => { return useContext(BranchListContext) };

export { useBranchListContext, BranchListProvider }