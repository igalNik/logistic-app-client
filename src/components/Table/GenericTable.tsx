import { TableProvider } from './context/TableProvider';
import Table from './Table';
import { TableProps } from './types';

function GenericTable<T>(props: TableProps<T>) {
  return (
    <TableProvider<T>
      tableConfig={props.tableConfig}
      tableConfigOnEdit={props.tableConfigOnEdit}
      data={props.data}
    >
      <Table<T> {...props}>{props.children}</Table>
    </TableProvider>
  );
}

export default GenericTable;
