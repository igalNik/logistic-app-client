import { useLoaderData } from 'react-router-dom';
import { tableConfig, tableConfigOnEdit, validationSchema } from './constants';
import { InventoryItem } from '../../../../types/inventory/InventoryItem.type';
import { GetInventoryResponse } from '../../../../types/inventory/GetInventoryResponse.type';
import Table from '../../../../components/Table';
import CreateInventoryItemForm from '../CreateInventoryItemForm/CreateInventoryItemForm';

function InventoryTable() {
  const inventory = useLoaderData<GetInventoryResponse>();

  return (
    <Table<InventoryItem>
      data={inventory.data}
      tableConfig={tableConfig}
      tableConfigOnEdit={tableConfigOnEdit}
      onUpdateMany={() => {}}
      onDeleteMany={() => {}}
      validationSchema={validationSchema}
    >
      <CreateInventoryItemForm />
    </Table>
  );
}

export default InventoryTable;
