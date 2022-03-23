import BranchList from "./BranchList";
import {BranchListProvider} from "../../Context/BranchListContext";
import { CategoryProvider } from "../../Context/CategoryContext";
export default () => {
    return(
        <>
            <BranchListProvider>
                <CategoryProvider>
                    <BranchList/>
                </CategoryProvider>
            </BranchListProvider>
        </>
    )
}