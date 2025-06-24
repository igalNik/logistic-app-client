import { EquipmentType } from '../types/equipment-type/EquipmentType';
import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './endpoints';

export interface GetAllEquipmentTypesResponse {
  status: 'success' | 'fails';
  data: EquipmentType[];
}

export const getAllEquipmentTypes = async () => {
  try {
    const res = await apiClient<GetAllEquipmentTypesResponse>(
      API_ENDPOINTS.EQUIPMENT.GET_ALL,
      { method: 'GET' }
    );

    return res;
  } catch (error) {
    console.log('failed to get all equipment Types', error);
  }
};

export const createEquipmentType = async (item: EquipmentType) => {
  const res = await apiClient<EquipmentType>(API_ENDPOINTS.EQUIPMENT.CREATE, {
    method: 'POST',
    body: item,
  });
  return res;
};

export const updateEquipmentTypes = async (equipments: EquipmentType[]) => {
  const res = await apiClient<any>(API_ENDPOINTS.EQUIPMENT.UPDATE, {
    method: 'PATCH',
    body: equipments,
  });
  return res;
};

export const deleteEquipmentTypes = async (itemIds: string[]) => {
  const res = await apiClient<any>(API_ENDPOINTS.EQUIPMENT.DELETE, {
    method: 'DELETE',
    body: itemIds,
  });
  return res;
};
