import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllDepartments,
  createDepartment,
  updateDepartments,
  deleteDepartments,
} from '../departments';

// Query keys
export const departmentKeys = {
  all: ['departments'] as const,
  lists: () => [...departmentKeys.all, 'list'] as const,
  list: (filters: string) => [...departmentKeys.lists(), { filters }] as const,
  details: () => [...departmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...departmentKeys.details(), id] as const,
};

// Custom hook for getting all departments
export const useDepartments = () => {
  return useQuery({
    queryKey: departmentKeys.lists(),
    queryFn: getAllDepartments,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook for getting departments with populate
export const useDepartmentsWithPopulate = () => {
  return useQuery({
    queryKey: [...departmentKeys.lists(), 'populate'],
    queryFn: getAllDepartments,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook for creating a department
export const useCreateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      // Invalidate and refetch departments list
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to create department:', error);
    },
  });
};

// Custom hook for updating departments
export const useUpdateDepartments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDepartments,
    onSuccess: () => {
      // Invalidate and refetch departments list
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to update departments:', error);
    },
  });
};

// Custom hook for deleting departments
export const useDeleteDepartments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDepartments,
    onSuccess: () => {
      // Invalidate and refetch departments list
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete departments:', error);
    },
  });
}; 