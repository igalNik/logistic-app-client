import {
  DepartmentStrings,
  tableConfig,
  tableConfigOnEdit,
  validationSchema,
} from './constants';

import { Department } from '../../../../types/Department';
import Table from '../../../../components/Table';
import CreateDepartmentForm from '../CreateDepartmentForm/CreateDepartmentForm';
import { useDepartments } from '../../../../api/queries';

function DepartmentsTableWithReactQuery() {
  // Use React Query hooks instead of loader data
  const { data: departments, isLoading, error } = useDepartments();

  // Handle error state
  if (error) {
    return <div>Error loading departments: {error.message}</div>;
  }

  // Handle no data
  if (!departments?.data) {
    return <div>No departments found</div>;
  }

  return (
    <Table<Department>
      title={DepartmentStrings.TITLE}
      description={DepartmentStrings.DESCRIPTION}
      data={departments.data}
      tableConfig={tableConfig}
      tableConfigOnEdit={tableConfigOnEdit}
      validationSchema={validationSchema}
      isLoading={isLoading}
      error={error?.message}
      // onUpdateMany={updateDepartmentsMutation.mutate}
      // onDeleteMany={deleteDepartmentsMutation.mutate}
    >
      <CreateDepartmentForm />
    </Table>
  );
}

export default DepartmentsTableWithReactQuery;
