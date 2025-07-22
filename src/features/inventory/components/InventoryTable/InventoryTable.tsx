import { tableConfig, tableConfigOnEdit, validationSchema } from './constants';
import { InventoryItem } from '../../../../types/inventory/InventoryItem.type';
import Table from '../../../../components/Table';
import CreateInventoryItemForm from '../CreateInventoryItemForm/CreateInventoryItemForm';
import { InventoryTableStrings } from './constants';
import { useInventory } from './../../../../api/queries';
import { toast } from 'react-toastify';
function InventoryTable() {
  const { data: inventory, isLoading } = useInventory();
  return (
    <Table<InventoryItem>
      title={InventoryTableStrings.TITLE}
      description={InventoryTableStrings.DESCRIPTION}
      data={inventory || []}
      tableConfig={tableConfig}
      tableConfigOnEdit={tableConfigOnEdit}
      // onUpdateMany={() => {}}
      // onDeleteMany={() => {}}
      validationSchema={validationSchema}
      isLoading={isLoading}
      onError={(message: string) => toast.error(message)}
      onSuccess={(message: string) => toast.success(message)}
      onNotification={(message: string) => toast.info(message)}
    >
      <CreateInventoryItemForm />
    </Table>
  );
}

export default InventoryTable;
