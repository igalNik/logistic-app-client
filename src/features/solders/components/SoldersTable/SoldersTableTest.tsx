import { useLoaderData } from 'react-router-dom';
import { GetAllSoldersResponse } from '../../../../api/solders';
// import Table from '../../../../components/Table/Table';
import { tableConfig, tableConfigOnEdit, validationSchema } from './constants';
import CreateSolderForm from '../CreateSolderForm/CreateSolderForm';
import { User } from '../../../../types/User';
import GenericTable from '../../../../components/Table/GenericTable';

function SoldersTableTest() {
  const solders = useLoaderData<GetAllSoldersResponse>();

  return (
    <GenericTable<User>
      data={solders.data}
      tableConfig={tableConfig}
      tableConfigOnEdit={tableConfigOnEdit}
      validationSchema={validationSchema}
    >
      <CreateSolderForm />
    </GenericTable>
  );
}

export default SoldersTableTest;
