import ArkaList from './ArkaList';
import { ArkaProvider } from '../../Context/ArkaContext';

export default () => {
  return (
    <ArkaProvider>
      <ArkaList />
    </ArkaProvider>
  );
};
