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

function DepartmentsTable() {
  const { data: departmentsResponse, isLoading, error } = useDepartments();
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
      // isLoading={isLoading}
      // error={error}
    >
      <CreateDepartmentForm />
    </Table>
  );
}

export default DepartmentsTable;
