import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './endpoints';

export interface LoginResponse {
  status: 'success' | 'fails';
  data: any;
}
export interface CheckAuthResponse {
  status: 'success' | 'fails';
  data: any;
}

export const handleLogin = async (personalNumber: string, password: string) => {
  try {
    const res = await apiClient<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: { personalNumber, password },
    });
    return res;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const handleLogout = async () => {
  try {
    await apiClient(API_ENDPOINTS.AUTH.LOGOUT, { method: 'POST' });
  } catch (error) {
    console.error('Logout error:', error);
    return null;
  }
};

export const handleCheckAuth = async (): Promise<CheckAuthResponse> => {
  try {
    const res = await apiClient<CheckAuthResponse>(
      API_ENDPOINTS.AUTH.CHECK_AUTH,
      {
        method: 'GET',
      }
    );
    return res;
  } catch (error) {
    console.log('not authorized: ', error);
    throw error;
  }
};
