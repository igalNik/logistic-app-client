import { GetInventoryResponse } from '../types/inventory/GetInventoryResponse.type';
import { CreateSolder } from '../types/solder/CreateSolder.type';
import { Solder } from '../types/solder/Solder';
import { UpdateSoldier } from '../types/solder/UpdateSoldier';
import { User } from '../types/User';
import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './endpoints';

export const getInventory = async () => {
  try {
    const res = await apiClient<GetInventoryResponse>(
      API_ENDPOINTS.INVENTORY.GET_ALL,
      { method: 'GET' }
    );

    return res;
  } catch (error) {
    console.log('failed to get all users', error);
  }
};
export const getInventoryWithPopulatedEquipment = async () => {
  try {
    const res = await apiClient<GetInventoryResponse>(
      API_ENDPOINTS.INVENTORY.GET_ALL_WITH_POPULATE_EQUIPMENT_TYPE,
      { method: 'GET' }
    );

    return res;
  } catch (error) {
    console.log('failed to get all users', error);
  }
};

export const createInventoryItem = async (solder: CreateSolder) => {
  const res = await apiClient<Solder>(API_ENDPOINTS.USERS.CREATE, {
    method: 'POST',
    body: solder,
  });
  return res;
};

export const updateSolders = async (solder: UpdateSoldier[] | User[]) => {
  const res = await apiClient<any>(API_ENDPOINTS.USERS.UPDATE, {
    method: 'PATCH',
    body: solder.map((solder) => {
      if ('department' in solder)
        return Promise.resolve({
          ...solder,
          departmentId: solder.department!.id,
        });
      else return solder;
    }),
  });
  return res;
};
