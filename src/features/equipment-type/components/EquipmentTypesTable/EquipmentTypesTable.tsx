import {
  EquipmentTypeStrings,
  tableConfig,
  tableConfigOnEdit,
  validationSchema,
} from './constants';

import { EquipmentType } from '../../../../types/equipment-type/EquipmentType';
import {
  deleteEquipmentTypes,
  updateEquipmentTypes,
} from '../../../../api/equipmentType';
import Table from '../../../../components/Table';
import CreateEquipmentTypeForm from '../CreateEquipmentTypeForm/CreateEquipmentTypeForm';
import { useEquipmentTypes } from './../../../../api/queries';
import { toast } from 'react-toastify';

function EquipmentTypesTable() {
  const { data: equipmentTypes, isLoading, error } = useEquipmentTypes();

  return (
    <Table<EquipmentType>
      title={EquipmentTypeStrings.TITLE}
      description={EquipmentTypeStrings.DESCRIPTION}
      data={equipmentTypes || []}
      tableConfig={tableConfig}
      tableConfigOnEdit={tableConfigOnEdit}
      validationSchema={validationSchema}
      onUpdateMany={updateEquipmentTypes}
      onDeleteMany={deleteEquipmentTypes}
      onError={(message: string) => toast.error(message)}
      onSuccess={(message: string) => toast.success(message)}
      onNotification={(message: string) => toast.info(message)}
      isLoading={isLoading}
    >
      <CreateEquipmentTypeForm />
    </Table>
  );
}

export default EquipmentTypesTable;
