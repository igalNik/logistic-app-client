import { useLoaderData } from 'react-router-dom';
import SoldersTable from '../features/solders/components/SoldersTable/SoldersTable';
import { GetAllSoldersResponse } from '../api/solders';
import SoldersTableTest from '../features/solders/components/SoldersTable/SoldersTableTest';

function Solders() {
  const solders = useLoaderData<GetAllSoldersResponse>();

  return <SoldersTableTest />;
}

export default Solders;
