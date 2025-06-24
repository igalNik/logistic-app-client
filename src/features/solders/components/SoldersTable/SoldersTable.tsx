import { useLoaderData } from 'react-router-dom';
import {
  deleteSolders,
  GetAllSoldersResponse,
  updateSolders,
} from '../../../../api/solders';
// import Table from '../../../../components/Table/Table';
import { tableConfig, tableConfigOnEdit, validationSchema } from './constants';
import CreateSolderForm from '../CreateSolderForm/CreateSolderForm';
import { User } from '../../../../types/User';
import Table from '../../../../components/Table';

function SoldersTable() {
  const solders = useLoaderData<GetAllSoldersResponse>();
  return (
    <Table<User>
      data={solders.data}
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
