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
import { toast } from 'react-toastify';
// import { useDeleteUsers, useUsers } from '';

function UsersTable() {
  const { data: users, isLoading } = useUsers();

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
      onError={(message: string) => toast.error(message)}
      onSuccess={(message: string) => toast.success(message)}
      onNotification={(message: string) => toast.info(message)}
    >
      <CreateUserForm />
    </Table>
  );
}

export default UsersTable;
