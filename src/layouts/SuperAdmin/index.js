import SuperAdmin from './SuperAdmin';
import { ClientProvider } from '../../Context/ClientContext';

export default () => {
  return (
    <ClientProvider>
      <SuperAdmin />
    </ClientProvider>
  );
};
