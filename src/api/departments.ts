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
      API_ENDPOINTS.DEPARTMENTS.GET_ALL,
      { method: 'GET' }
    );

    return res;
  } catch (error) {
    console.log('failed to get all users', error);
  }
};
