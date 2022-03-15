import Categories from "./Categories";
import {CategoryProvider} from "../../Context/CategoryContext";


export default () =>{
    return (
        <>
            <CategoryProvider>
                <Categories/>
            </CategoryProvider>
        </>
    )
}
