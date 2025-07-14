import { TableProvider } from './context/TableProvider';
import Table from './Table';
import { TableProps } from './types';

const GenericTable = function <T>(props: TableProps<T>) {
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
