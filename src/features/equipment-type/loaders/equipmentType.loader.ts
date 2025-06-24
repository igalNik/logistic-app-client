import { getAllEquipmentTypes } from '../../../api/equipmentType';

export const equipmentTypesLoader = async () => {
  const equipmentTypes = await getAllEquipmentTypes();
  console.log('Equipment Types:', equipmentTypes);

  return equipmentTypes;
};
