import { useLoaderData } from 'react-router-dom';
import { GetAllSoldersResponse } from '../../../../api/solders';
import Table from '../../../../components/Table/Table';
import { tableConfig, tableConfigOnEdit } from './constants';
import CreateSolderForm from '../CreateSolderForm/CreateSolderForm';

function SoldersTableTest() {
  const solders = useLoaderData<GetAllSoldersResponse>();

  return (
    <Table
      data={solders.data}
      tableConfig={tableConfig}
      tableConfigOnEdit={tableConfigOnEdit}
    >
      <CreateSolderForm />
    </Table>
  );
}

export default SoldersTableTest;
