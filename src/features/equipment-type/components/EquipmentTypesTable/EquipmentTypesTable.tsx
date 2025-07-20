import { useLoaderData } from 'react-router-dom';
import {
  EquipmentTypeStrings,
  tableConfig,
  tableConfigOnEdit,
  validationSchema,
} from './constants';

import { EquipmentType } from '../../../../types/equipment-type/EquipmentType';
import {
  deleteEquipmentTypes,
  GetAllEquipmentTypesResponse,
  updateEquipmentTypes,
} from '../../../../api/equipmentType';
import Table from '../../../../components/Table';
import CreateEquipmentTypeForm from '../CreateEquipmentTypeForm/CreateEquipmentTypeForm';
import { useEquipmentTypes } from './../../../../api/queries';

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
      isLoading={isLoading}
    >
      <CreateEquipmentTypeForm />
    </Table>
  );
}

export default EquipmentTypesTable;
