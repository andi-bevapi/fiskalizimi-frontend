import ArkaList from './ArkaList';
import { ArkaProvider } from '../../Context/ArkaContext';
import { BranchListProvider } from '../../Context/BranchListContext';

export default () => {
  return (
    <BranchListProvider>
      <ArkaProvider>
        <ArkaList />
      </ArkaProvider>
    </BranchListProvider>
  );
};
