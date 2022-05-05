import EditProfile from "./EditProfile";
import {UsersListProvider} from "../../Context/UsersListContext";

export default () => {
    return (
      <UsersListProvider>
          <EditProfile />
      </UsersListProvider>
    );
  };