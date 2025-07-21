import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getInventory,
  getInventoryWithPopulatedEquipmentAndUser,
  createInventoryItem,
  updateInventoryItems,
} from '../inventory';
import {
  GetInventoryResponse,
  InventoryResponse,
} from 'api/types/response.type';
// Ensure getInventory returns the correct GetInventoryResponse type from 'api/types/response.type'

// Query keys
export const inventoryKeys = {
  all: ['inventory'] as const,
  lists: () => [...inventoryKeys.all, 'list'] as const,
  list: (filters: string) => [...inventoryKeys.lists(), { filters }] as const,
  details: () => [...inventoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...inventoryKeys.details(), id] as const,
};

// Custom hook for getting all inventory items
export const useInventory = () => {
  return useQuery({
    queryKey: inventoryKeys.lists(),
    queryFn: getInventoryWithPopulatedEquipmentAndUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (res: GetInventoryResponse) => res.data as InventoryResponse,
  });
};

// Custom hook for getting inventory with populated equipment and user
export const useInventoryWithPopulate = () => {
  return useQuery({
    queryKey: [...inventoryKeys.lists(), 'populate'],
    queryFn: getInventoryWithPopulatedEquipmentAndUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook for creating an inventory item
export const useCreateInventoryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInventoryItem,
    onSuccess: () => {
      // Invalidate and refetch inventory list
      queryClient.invalidateQueries({ queryKey: inventoryKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to create inventory item:', error);
    },
  });
};

// Custom hook for updating inventory items
export const useUpdateInventoryItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInventoryItems,
    onSuccess: () => {
      // Invalidate and refetch inventory list
      queryClient.invalidateQueries({ queryKey: inventoryKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to update inventory items:', error);
    },
  });
};
