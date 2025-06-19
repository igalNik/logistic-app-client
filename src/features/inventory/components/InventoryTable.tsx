import { useLoaderData } from 'react-router-dom';
import { tableConfig, tableConfigOnEdit, validationSchema } from './constants';
import { InventoryItem } from '../../../types/inventory/InventoryItem.type';
import { GetInventoryResponse } from '../../../types/inventory/GetInventoryResponse.type';
import Table from '../../../components/Table';

function InventoryTable() {
  const inventory = useLoaderData<GetInventoryResponse>();
  console.log('inventory', inventory);

  return (
    <Table<InventoryItem>
      data={inventory.data}
      tableConfig={tableConfig}
      tableConfigOnEdit={tableConfigOnEdit}
      validationSchema={validationSchema}
      //   onUpdateMany={updateEquipmentTypes}
    >
      <h1>Inventory Table</h1>
    </Table>
  );
}

export default InventoryTable;
