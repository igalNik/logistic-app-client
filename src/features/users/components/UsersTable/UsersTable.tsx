import { UsersStrings, validationSchema } from './constants';
import CreateUserForm from '../CreateUserForm/CreateUserForm';
import { User } from '../../../../types/User';
import Table from '../../../../components/Table';
import useUsersColDef from './useUsersColDef';
import {
  useUsers,
  useDeleteUsers,
  useUpdateUsers,
} from './../../../../api/queries/users';
import { UpdateUserRequest } from 'api/types/request.type';
// import { useDeleteUsers, useUsers } from '';

function UsersTable() {
  const { data: users, isLoading, error } = useUsers();

  const { tableConfig, tableConfigOnEdit } = useUsersColDef();

  const { mutate: deleteUsersMutation } = useDeleteUsers();

  const { mutate: updateUsersMutation } = useUpdateUsers();

  const handleUpdateMany = (updates: User[] | UpdateUserRequest[]) => {
    updateUsersMutation(updates);
  };
  const handleDeleteMany = (usersIds: string[]) => {
    deleteUsersMutation(usersIds);
  };

  return (
    <Table<User>
      title={UsersStrings.TITLE}
      description={UsersStrings.DESCRIPTION}
      data={users || []}
      tableConfig={tableConfig}
      tableConfigOnEdit={tableConfigOnEdit}
      validationSchema={validationSchema}
      onUpdateMany={handleUpdateMany}
      onDeleteMany={handleDeleteMany}
      isLoading={isLoading}
      error={error?.message}
      // defaultColDef={[]}
    >
      <CreateUserForm />
    </Table>
  );
}

export default UsersTable;
