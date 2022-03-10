import Users from './Users';
import { UserProvider } from '../../context/UserContext';

const UserIndex = () => {
  return (
    <UserProvider>
      <Users />
    </UserProvider>
  );
};

export default UserIndex;
