import { Department } from '../types/Department';
import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './endpoints';

export interface GetAllDepartmentsResponse {
  status: 'success' | 'fails';
  data: Department[];
}

export const getAllDepartments = async () => {
  try {
    const res = await apiClient<GetAllDepartmentsResponse>(
      API_ENDPOINTS.DEPARTMENTS.GET_ALL_POPULATE_OFFICER,
      { method: 'GET' }
    );

    return res;
  } catch (error) {
    console.log('failed to get all users', error);
  }
};

export const createDepartment = async (item: Department) => {
  const res = await apiClient<Department>(API_ENDPOINTS.EQUIPMENT.CREATE, {
    method: 'POST',
    body: item,
  });
  return res;
};

export const updateDepartments = async (equipments: Department[]) => {
  const res = await apiClient<any>(API_ENDPOINTS.DEPARTMENTS.UPDATE, {
    method: 'PATCH',
    body: equipments,
  });
  return res;
};

export const deleteDepartments = async (itemIds: string[]) => {
  const res = await apiClient<any>(API_ENDPOINTS.DEPARTMENTS.DELETE, {
    method: 'DELETE',
    body: itemIds,
  });
  return res;
};
