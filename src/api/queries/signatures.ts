import { useQuery } from '@tanstack/react-query';
import { getAllSignatures } from '../signatures';
import { GetSignaturesResponse } from 'api/types/response.type';

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
