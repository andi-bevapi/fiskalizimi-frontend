import Categories from './Categories';
import { CategoryProvider } from '../../Context/CategoryContext';
import { BranchListProvider } from '../../Context/BranchListContext';

export default () => {
  return (
    <BranchListProvider>
      <CategoryProvider>
        <Categories />
      </CategoryProvider>
    </BranchListProvider>
  );
};
