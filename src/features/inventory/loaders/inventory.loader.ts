import {
  getInventory,
  getInventoryWithPopulatedEquipmentAndUser,
} from '../../../api/inventory';

export const inventoryLoader = async () => {
  const inventory = await getInventory();
  return inventory;
};
export const inventoryWithPopulatedEquipmentTypeLoader = async () => {
  const inventory = await getInventoryWithPopulatedEquipmentAndUser();
  console.log(inventory);

  return inventory;
};
