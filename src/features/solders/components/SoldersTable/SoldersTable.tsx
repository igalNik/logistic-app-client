import {
  deleteSolders,
  updateSolders,
  getAllSolders,
} from '../../../../api/solders';
import { SoldiersStrings, validationSchema } from './constants';
import CreateSolderForm from '../CreateSolderForm/CreateSolderForm';
import { User } from '../../../../types/User';
import Table from '../../../../components/Table';
import useSoldersColDef from './useSoldersColDef';
import { useQuery } from '@tanstack/react-query';

function SoldersTable() {
  const { data: soldersResponse, isLoading, error } = useQuery({
    queryKey: ['solders'],
    queryFn: getAllSolders,
  });

  const { tableConfig, tableConfigOnEdit } = useSoldersColDef();

  console.log('SoldersTable - isLoading:', isLoading);
  console.log('SoldersTable - full response:', soldersResponse);
  console.log('SoldersTable - data array:', soldersResponse?.data);
  console.log('SoldersTable - data length:', soldersResponse?.data?.length);

  // Extract the data array from the response
  const tableData = soldersResponse?.data ?? [];

  return (
    <Table<User>
      title={SoldiersStrings.TITLE}
      description={SoldiersStrings.DESCRIPTION}
      data={tableData}
      tableConfig={tableConfig}
      tableConfigOnEdit={tableConfigOnEdit}
      validationSchema={validationSchema}
      onUpdateMany={updateSolders}
      onDeleteMany={deleteSolders}
      isLoading={isLoading}
      error={error?.message}
    >
      <CreateSolderForm />
    </Table>
  );
}

export default SoldersTable;
