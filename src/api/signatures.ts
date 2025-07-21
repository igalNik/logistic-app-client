import { SignatureRow } from '@/types/Signature';
import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './endpoints';
import { Signature } from '@/types/signature/Signature.type';
import {
  ApiResponse,
  GetSignatureResponse,
  GetSignaturesResponse,
  SignatureResponse,
} from './types/response.type';

const BASE_URL =
  API_ENDPOINTS.SIGNATURES?.GET_ALL || '/api/user-equipment-signature-actions';

export const getAllSignatures = async () => {
  const res = await apiClient<GetSignaturesResponse>(BASE_URL, {
    method: 'GET',
  });

  return await res;
};

export const getSignatureById = async (id: string) => {
  const res = await apiClient<GetSignatureResponse>(`${BASE_URL}/${id}`, {
    method: 'GET',
  });
  return res;
};

export const createSignature = async (
  signature: Signature
): Promise<Signature> => {
  const res = await apiClient<{ data: Signature }>(BASE_URL, {
    method: 'POST',
    body: signature,
  });
  return res.data;
};

export const updateSignature = async (
  signature: Signature
): Promise<Signature> => {
  const res = await apiClient<{ data: Signature }>(
    `${BASE_URL}/${signature._id}`,
    {
      method: 'PATCH',
      body: signature,
    }
  );
  return res.data;
};

export const deleteSignature = async (id: string): Promise<void> => {
  await apiClient(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
};
