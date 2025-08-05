// src/hooks/useAuth.ts
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { fetchUser, login as loginApi, logout as logoutApi } from '../services/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ['auth-user'],
    queryFn: fetchUser,
    enabled: !!token,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      queryClient.setQueryData(['auth-user'], data.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      localStorage.removeItem('token');
      setToken(null);
      queryClient.clear();
    },
  });

  const login = async (email: string, password: string) => {
    return loginMutation.mutateAsync({ email, password });
  };

  const logout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate('/login') 
      },
    });
  };

  return {
    user,
    login,
    logout,
    token,
    isLoading: isLoading || loginMutation.isPending || logoutMutation.isPending,
    isAuthenticated: !!token && !!user,
  };
};