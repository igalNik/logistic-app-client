import { useLoaderData } from 'react-router-dom';
import SoldersTable from '../features/solders/components/SoldersTable/SoldersTable';
import { GetAllSoldersResponse } from '../api/solders';

function Solders() {
  const solders = useLoaderData<GetAllSoldersResponse>();

  return <SoldersTable solders={solders.data} />;
}

export default Solders;
