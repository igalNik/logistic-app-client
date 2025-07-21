import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './endpoints';
import { GetSignaturesResponse } from './types/response.type';

const BASE_URL =
  API_ENDPOINTS.SIGNATURES?.GET_ALL || '/api/user-equipment-signature-actions';

export const getAllSignatures = async () => {
  const res = await apiClient<GetSignaturesResponse>(BASE_URL, {
    method: 'GET',
  });

  return res;
};
