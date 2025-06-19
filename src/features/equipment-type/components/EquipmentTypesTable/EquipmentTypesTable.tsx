import { useLoaderData } from 'react-router-dom';
import { tableConfig, tableConfigOnEdit, validationSchema } from './constants';

import { EquipmentType } from '../../../../types/equipment-type/EquipmentType';
import {
  GetAllEquipmentTypesResponse,
  updateEquipmentTypes,
} from '../../../../api/equipmentType';
import Table from '../../../../components/Table';
import CreateEquipmentTypeForm from '../CreateEquipmentTypeForm/CreateEquipmentTypeForm';

function EquipmentTypesTable() {
  const equipmentTypes = useLoaderData<GetAllEquipmentTypesResponse>();

  return (
    <Table<EquipmentType>
      data={equipmentTypes.data}
      tableConfig={tableConfig}
      tableConfigOnEdit={tableConfigOnEdit}
      validationSchema={validationSchema}
      onUpdateMany={updateEquipmentTypes}
    >
      <CreateEquipmentTypeForm />
    </Table>
  );
}

export default EquipmentTypesTable;
