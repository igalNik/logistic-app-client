import { CreateSolder } from '../types/solder/CreateSolder.type';
import { Solder } from '../types/solder/Solder';
import { User } from '../types/User';
import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './endpoints';

export interface GetAllSoldersResponse {
  status: 'success' | 'fails';
  data: User[];
}

export const getAllSolders = async () => {
  try {
    const res = await apiClient<GetAllSoldersResponse>(
      API_ENDPOINTS.USERS.GET_ALL,
      { method: 'GET' }
    );

    return res;
  } catch (error) {
    console.log('failed to get all users', error);
  }
};

export const createSolder = async (solder: CreateSolder) => {
  const res = await apiClient<Solder>(API_ENDPOINTS.USERS.CREATE, {
    method: 'POST',
    body: solder,
  });
  return res;
};
