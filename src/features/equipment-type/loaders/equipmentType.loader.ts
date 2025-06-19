import { getAllEquipmentTypes } from '../../../api/equipmentType';

export const equipmentTypesLoader = async () => {
  const users = await getAllEquipmentTypes();
  return users;
};
