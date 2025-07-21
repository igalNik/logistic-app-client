import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllSignatures,
  getSignatureById,
  createSignature,
  updateSignature,
  deleteSignature,
} from '../signatures';
import { Signature, SignatureRow } from '@/types/Signature';
import {
  GetSignaturesResponse,
  SignatureResponse,
} from 'api/types/response.type';

export const signaturesKeys = {
  all: ['signatures'] as const,
  lists: () => [...signaturesKeys.all, 'list'] as const,
  list: (filters: string) => [...signaturesKeys.lists(), { filters }] as const,
  details: () => [...signaturesKeys.all, 'detail'] as const,
  detail: (id: string) => [...signaturesKeys.details(), id] as const,
};

export const useSignatures = () => {
  return useQuery({
    queryKey: signaturesKeys.lists(),
    queryFn: getAllSignatures,
    staleTime: 5 * 60 * 1000,
    select: (res: GetSignaturesResponse) => res.data,
  });
};

export const useSignatureById = (id: string) => {
  return useQuery<Signature, Error>({
    queryKey: signaturesKeys.detail(id),
    queryFn: () => getSignatureById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateSignature = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSignature,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: signaturesKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to create signature:', error);
    },
  });
};

export const useUpdateSignature = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSignature,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: signaturesKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to update signature:', error);
    },
  });
};

export const useDeleteSignature = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSignature,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: signaturesKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete signature:', error);
    },
  });
};
