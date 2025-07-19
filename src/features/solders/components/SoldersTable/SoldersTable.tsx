import { SoldiersStrings, validationSchema } from './constants';
import CreateSolderForm from '../CreateSolderForm/CreateSolderForm';
import { User } from '../../../../types/User';
import Table from '../../../../components/Table';
import useSoldersColDef from './useSoldersColDef';
import { useDeleteSolders, useSolders } from '../../../../api/queries';
import { deleteSolders, updateSolders } from '../../../../api/solders';

function SoldersTable() {
  const { data: solders, isLoading, error } = useSolders();

  const { tableConfig, tableConfigOnEdit } = useSoldersColDef();

  const { mutate: deleteSoldersMutation } = useDeleteSolders();

  const handleDeleteMany = (soldersIds: string[]) => {
    deleteSoldersMutation(soldersIds);
  };
  // Extract the data array from the response

  return (
    <Table<User>
      title={SoldiersStrings.TITLE}
      description={SoldiersStrings.DESCRIPTION}
      data={solders}
      tableConfig={tableConfig}
      tableConfigOnEdit={tableConfigOnEdit}
      validationSchema={validationSchema}
      onUpdateMany={handleDeleteMany}
      onDeleteMany={deleteSolders}
      isLoading={isLoading}
      error={error?.message}
      // defaultColDef={[]}
    >
      <CreateSolderForm />
    </Table>
  );
}

export default SoldersTable;
