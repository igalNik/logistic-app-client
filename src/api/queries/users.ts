import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUsers,
  deleteUsers,
} from '../users';
import { CreateUserResponse, GetUsersResponse } from '../types/response.type';
import { User } from '@/types/User';

// Query keys
export const usersKeys = {
  all: ['users'] as const,
  lists: () => [...usersKeys.all, 'list'] as const,
  list: (filters: string) => [...usersKeys.lists(), { filters }] as const,
  details: () => [...usersKeys.all, 'detail'] as const,
  detail: (id: string) => [...usersKeys.details(), id] as const,
};

// Custom hook for getting all users
export const useUsers = () => {
  return useQuery({
    queryKey: usersKeys.lists(),
    queryFn: getAllUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (response: GetUsersResponse) => response.data as User[],
  });
};

// Custom hook for getting a user by ID
export const useUserById = (id: string) => {
  return useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => getUserById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (response: GetUsersResponse) => response.data,
  });
};

// Custom hook for creating a user
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: ({ data: newUser }: CreateUserResponse) => {
      // Invalidate and refetch users list
      console.log(newUser);

      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to create user:', error);
      throw error;
    },
  });
};

// Custom hook for updating users
export const useUpdateUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUsers,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to update users:', error);
    },
  });
};

// Custom hook for deleting users
export const useDeleteUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => deleteUsers(ids),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete users:', error);
    },
  });
};
