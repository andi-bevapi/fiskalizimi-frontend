import BranchList from "./BranchList";
import { BranchListProvider } from "../../Context/BranchListContext";

export default () => {
    return (
        <BranchListProvider>
            <BranchList />
        </BranchListProvider>
    )
}