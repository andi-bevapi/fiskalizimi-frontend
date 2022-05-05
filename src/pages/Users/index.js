import Users from './Users';
import { UsersListProvider } from '../../Context/UsersListContext';
import { BranchListProvider } from "../../Context/BranchListContext";
import Compose from '../../components/Compose';

export default () => {
  return (
    <Compose components={[UsersListProvider, BranchListProvider]}>
      <Users />
    </Compose>
  );
};
