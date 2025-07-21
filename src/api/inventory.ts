import { EquipmentType } from '@/types/equipment-type/EquipmentType';
import { GetInventoryResponse } from '@/types/inventory/GetInventoryResponse.type';
import { InventoryItem } from '@/types/inventory/InventoryItem.type';

import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './endpoints';

export const getInventory = async () => {
  const res = await apiClient<GetInventoryResponse>(
    API_ENDPOINTS.INVENTORY.GET_ALL,
    { method: 'GET' }
  );

  return res;
};

export const getInventoryWithPopulatedEquipmentAndUser = async () => {
  const res = await apiClient<GetInventoryResponse>(
    API_ENDPOINTS.INVENTORY.GET_ALL_WITH_POPULATE_EQUIPMENT_TYPE,
    { method: 'GET' }
  );
  console.log(res);

  return res;
};

export const createInventoryItem = async (item: InventoryItem) => {
  const res = await apiClient<EquipmentType>(API_ENDPOINTS.INVENTORY.CREATE, {
    method: 'POST',
    body: item,
  });
  return res;
};

export const updateInventoryItems = async (items: InventoryItem[]) => {
  const res = await apiClient<any>(API_ENDPOINTS.INVENTORY.UPDATE, {
    method: 'PATCH',
    body: items,
  });
  return res;
};
