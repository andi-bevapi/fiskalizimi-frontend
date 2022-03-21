import Users from './Users';
import { UserProvider } from '../../context/UserContext';
import {CategoryProvider} from "../../Context/CategoryContext";

const UserIndex = () => {
  return (
    <UserProvider>
      <CategoryProvider>
        <Users />
      </CategoryProvider>
    </UserProvider>
  );
};

export default UserIndex;
