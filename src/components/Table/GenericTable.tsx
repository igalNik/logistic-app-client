import { TableProvider } from './context/TableProvider';
import Table from './Table';
import { TableProps } from './types';

function GenericTable<T>(props: TableProps<T>) {
  return (
    <TableProvider<T>
      tableConfig={props.tableConfig}
      tableConfigOnEdit={props.tableConfigOnEdit}
      initialData={props.data}
      validationSchema={props.validationSchema}
      onUpdateMany={props.onUpdateMany}
      onDeleteMany={props.onDeleteMany}
    >
      <Table<T> {...props}>{props.children}</Table>
    </TableProvider>
  );
}

export default GenericTable;
