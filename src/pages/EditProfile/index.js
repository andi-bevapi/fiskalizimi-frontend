import EditProfile from "./EditProfile";
import {UserProvider} from "../../context/UserContext";

export default () => {
    return (
      <UserProvider>
          <EditProfile />
      </UserProvider>
    );
  };