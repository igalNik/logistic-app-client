import { useLoaderData } from 'react-router-dom';
import {
  DepartmentStrings,
  tableConfig,
  tableConfigOnEdit,
  validationSchema,
} from './constants';

import Table from '../../../../components/Table';
import CreateDepartmentForm from '../CreateDepartmentForm/CreateDepartmentForm';
import { useDepartments } from '../../../../api/queries';
import { Department } from '../../../../types/Department';
import { toast } from 'react-toastify';

function DepartmentsTable() {
  const { data: departmentsResponse, isLoading } = useDepartments();
  console.log(departmentsResponse);

  return (
    <Table<Department>
      title={DepartmentStrings.TITLE}
      description={DepartmentStrings.DESCRIPTION}
      data={departmentsResponse?.data ?? []}
      tableConfig={tableConfig}
      tableConfigOnEdit={tableConfigOnEdit}
      validationSchema={validationSchema}
      // onUpdateMany={updateDepartments}
      // onDeleteMany={deleteDepartments}
      onError={(message: string) => toast.error(message)}
      onSuccess={(message: string) => toast.success(message)}
      onNotification={(message: string) => toast.info(message)}
      isLoading={isLoading}
    >
      <CreateDepartmentForm />
    </Table>
  );
}

export default DepartmentsTable;
