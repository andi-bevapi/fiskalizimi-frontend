import {DashboardProvider} from "../../Context/DashboardContext"
import DashboardHeader from "./DashboardHeader";

export default () => {
  return (
    <DashboardProvider>
            <DashboardHeader/>
    </DashboardProvider>
  );
};