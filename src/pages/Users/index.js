import Users from './Users';
import { UserProvider } from '../../context/UserContext';
import { BranchListProvider } from "../../Context/BranchListContext";
import Compose from '../../components/Compose';

export default () => {
  return (
    <Compose components={[UserProvider, BranchListProvider]}>
      <Users />
    </Compose>
  );
};
