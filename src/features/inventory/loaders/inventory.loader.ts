import {
  getInventory,
  getInventoryWithPopulatedEquipment,
} from '../../../api/inventory';

export const inventoryLoader = async () => {
  const inventory = await getInventory();
  return inventory;
};
export const inventoryWithPopulatedEquipmentTypeLoader = async () => {
  const inventory = await getInventoryWithPopulatedEquipment();
  console.log(inventory);

  return inventory;
};
