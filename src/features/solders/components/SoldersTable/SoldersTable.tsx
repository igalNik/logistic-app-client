import { useLoaderData } from 'react-router-dom';
import {
  deleteSolders,
  getAllSolders,
  GetAllSoldersResponse,
  updateSolders,
} from '../../../../api/solders';
// import Table from '../../../../components/Table/Table';
import {
  SoldiersStrings,
  // tableConfig,
  // tableConfigOnEdit,
  validationSchema,
} from './constants';
import CreateSolderForm from '../CreateSolderForm/CreateSolderForm';
import { User } from '../../../../types/User';
import Table from '../../../../components/Table';
import useSoldersColDef from './useSoldersColDef';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../../components/Spinner';
import PageNotFound from '../../../../pages/PageNotFound';

function SoldersTable() {
  const {
    isLoading,
    isError,
    data: soldersResponse,
  } = useQuery({
    queryKey: ['solders'],
    queryFn: getAllSolders,
  });

  const { tableConfig, tableConfigOnEdit } = useSoldersColDef();

  if (isLoading) return <Spinner type={'page'} />;
  if (isError) return <PageNotFound />;

  return (
    <Table<User>
      title={SoldiersStrings.TITLE}
      description={SoldiersStrings.DESCRIPTION}
      data={soldersResponse?.data ?? []}
      tableConfig={tableConfig}
      tableConfigOnEdit={tableConfigOnEdit}
      validationSchema={validationSchema}
      onUpdateMany={updateSolders}
      onDeleteMany={deleteSolders}
    >
      <CreateSolderForm />
    </Table>
  );
}

export default SoldersTable;
