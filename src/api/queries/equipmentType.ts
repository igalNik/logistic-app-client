import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllEquipmentTypes,
  createEquipmentType,
  updateEquipmentTypes,
  deleteEquipmentTypes,
  GetAllEquipmentTypesResponse,
} from '../equipmentType';
import { EquipmentType } from '@/types/equipment-type/EquipmentType';

// Query keys
export const equipmentTypeKeys = {
  all: ['equipmentTypes'] as const,
  lists: () => [...equipmentTypeKeys.all, 'list'] as const,
  list: (filters: string) =>
    [...equipmentTypeKeys.lists(), { filters }] as const,
  details: () => [...equipmentTypeKeys.all, 'detail'] as const,
  detail: (id: string) => [...equipmentTypeKeys.details(), id] as const,
};

// Custom hook for getting all equipment types
export const useEquipmentTypes = () => {
  return useQuery({
    queryKey: equipmentTypeKeys.lists(),
    queryFn: getAllEquipmentTypes,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (res: GetAllEquipmentTypesResponse | undefined) =>
      res?.data as EquipmentType[],
  });
};

// Custom hook for creating an equipment type
export const useCreateEquipmentType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEquipmentType,
    onSuccess: () => {
      // Invalidate and refetch equipment types list
      queryClient.invalidateQueries({ queryKey: equipmentTypeKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to create equipment type:', error);
    },
  });
};

// Custom hook for updating equipment types
export const useUpdateEquipmentTypes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEquipmentTypes,
    onSuccess: () => {
      // Invalidate and refetch equipment types list
      queryClient.invalidateQueries({ queryKey: equipmentTypeKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to update equipment types:', error);
    },
  });
};

// Custom hook for deleting equipment types
export const useDeleteEquipmentTypes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEquipmentTypes,
    onSuccess: () => {
      // Invalidate and refetch equipment types list
      queryClient.invalidateQueries({ queryKey: equipmentTypeKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete equipment types:', error);
    },
  });
};
