import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllSolders,
  getSolderById,
  createSolder,
  updateSolders,
  deleteSolders,
} from '../solders';

// Query keys
export const soldersKeys = {
  all: ['solders'] as const,
  lists: () => [...soldersKeys.all, 'list'] as const,
  list: (filters: string) => [...soldersKeys.lists(), { filters }] as const,
  details: () => [...soldersKeys.all, 'detail'] as const,
  detail: (id: string) => [...soldersKeys.details(), id] as const,
};

// Custom hook for getting all solders
export const useSolders = () => {
  return useQuery({
    queryKey: soldersKeys.lists(),
    queryFn: getAllSolders,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook for getting a solder by ID
export const useSolderById = (id: string) => {
  return useQuery({
    queryKey: soldersKeys.detail(id),
    queryFn: () => getSolderById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook for creating a solder
export const useCreateSolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSolder,
    onSuccess: () => {
      // Invalidate and refetch solders list
      queryClient.invalidateQueries({ queryKey: soldersKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to create solder:', error);
    },
  });
};

// Custom hook for updating solders
export const useUpdateSolders = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSolders,
    onSuccess: () => {
      // Invalidate and refetch solders list
      queryClient.invalidateQueries({ queryKey: soldersKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to update solders:', error);
    },
  });
};

// Custom hook for deleting solders
export const useDeleteSolders = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSolders,
    onSuccess: () => {
      // Invalidate and refetch solders list
      queryClient.invalidateQueries({ queryKey: soldersKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete solders:', error);
    },
  });
};
