import { CreateUserRequest, UpdateUserRequest } from './types/request.type';
import {
  CreateUserResponse,
  GetUserResponse,
  GetUsersResponse,
} from './types/response.type';
import { User } from '@/types/User';
import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './endpoints';

export const getUserById = async (id: string) => {
  try {
    const res = await apiClient<any>(API_ENDPOINTS.USERS.GET_BY_ID(id), {
      method: 'GET',
    });

    return res;
  } catch {
    throw Error('failed to get user');
  }
};

export const getAllUsers = async () => {
  try {
    const res = await apiClient<GetUsersResponse>(API_ENDPOINTS.USERS.GET_ALL, {
      method: 'GET',
    });

    return res;
  } catch (error) {
    console.log('failed to get all users', error);
    throw error;
  }
};

export const createUser = async (user: CreateUserRequest) => {
  const res = await apiClient<CreateUserResponse>(API_ENDPOINTS.USERS.CREATE, {
    method: 'POST',
    body: user,
  });
  return res;
};

export const updateUsers = async (user: UpdateUserRequest[] | User[]) => {
  const res = await apiClient<any>(API_ENDPOINTS.USERS.UPDATE, {
    method: 'PATCH',
    body: user.map((user) => {
      if ('department' in user)
        return Promise.resolve({
          ...user,
          departmentId: user.department!.id,
        });
      else return user;
    }),
  });
  return res;
};

export const deleteUsers = async (usersIds: string[]) => {
  const res = await apiClient<any>(API_ENDPOINTS.USERS.DELETE, {
    method: 'DELETE',
    body: usersIds,
  });
  return res;
};

export const handleMe = async (): Promise<GetUserResponse> => {
  const res = await apiClient<GetUserResponse>(API_ENDPOINTS.USERS.ME, {
    method: 'GET',
  });
  return res;
};

export const handleUpdateManyUsers = async (): Promise<any> => {
  const res = await apiClient<GetUserResponse>(API_ENDPOINTS.USERS.UPDATE, {
    method: 'GET',
  });
  return res;
};
