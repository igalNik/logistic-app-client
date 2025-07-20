import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleLogin, handleLogout, handleCheckAuth } from '../auth';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  check: () => [...authKeys.all, 'check'] as const,
};

// Custom hook for checking authentication status
export const useCheckAuth = () => {
  return useQuery({
    queryKey: authKeys.check(),
    queryFn: handleCheckAuth,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// Custom hook for login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      personalNumber,
      password,
    }: {
      personalNumber: string;
      password: string;
    }) => handleLogin(personalNumber, password),
    onSuccess: () => {
      // Invalidate and refetch auth check
      queryClient.invalidateQueries({ queryKey: authKeys.check() });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

// Custom hook for logout
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleLogout,
    onSuccess: () => {
      // Clear all queries on logout
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });
};
