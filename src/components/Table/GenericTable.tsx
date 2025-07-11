import { TableProvider } from './context/TableProvider';
import Table from './Table';
import { TableProps } from './types';

const GenericTable = function <T>(props: TableProps<T>) {
  console.log('GenericTable - isLoading:', props.isLoading);
  console.log('GenericTable - data:', props.data);
  console.log('GenericTable - error:', props.error);

  return (
    <TableProvider<T>
      tableConfig={props.tableConfig}
      tableConfigOnEdit={props.tableConfigOnEdit}
      initialData={props.data}
      validationSchema={props.validationSchema}
      onUpdateMany={props.onUpdateMany}
      onDeleteMany={props.onDeleteMany}
      isLoading={props.isLoading}
      error={props.error}
    >
      <Table<T> {...props}>{props.children}</Table>
    </TableProvider>
  );
};

export default GenericTable;
