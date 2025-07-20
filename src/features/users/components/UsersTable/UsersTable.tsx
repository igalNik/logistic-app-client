import { UsersStrings, validationSchema } from './constants';
import CreateUserForm from '../CreateUserForm/CreateUserForm';
import { User } from '../../../../types/User';
import Table from '../../../../components/Table';
import useUsersColDef from './useUsersColDef';
import { deleteUsers } from '../../../../api/users';
import { useUsers, useDeleteUsers } from './../../../../api/queries/users';
// import { useDeleteUsers, useUsers } from '';

function UsersTable() {
  const { data: users, isLoading, error } = useUsers();

  const { tableConfig, tableConfigOnEdit } = useUsersColDef();

  const { mutate: deleteUsersMutation } = useDeleteUsers();

  const handleDeleteMany = (usersIds: string[]) => {
    deleteUsersMutation(usersIds);
  };
  // Extract the data array from the response

  return (
    <Table<User>
      title={UsersStrings.TITLE}
      description={UsersStrings.DESCRIPTION}
      data={users || []}
      tableConfig={tableConfig}
      tableConfigOnEdit={tableConfigOnEdit}
      validationSchema={validationSchema}
      onUpdateMany={handleDeleteMany}
      onDeleteMany={deleteUsers}
      isLoading={isLoading}
      error={error?.message}
      // defaultColDef={[]}
    >
      <CreateUserForm />
    </Table>
  );
}

export default UsersTable;
