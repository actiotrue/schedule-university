import { AuthResponse } from '@/client';
import {
  checkAuthQueryKey,
  loginUserMutation,
  logoutUserMutation,
  processRefreshTokenMutation,
  registerUserMutation,
} from '@/client/@tanstack/react-query.gen';
import { useToastNotification } from '@/shared/hooks/useToastNotification';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRegisterUserMutation = () => {
  return useMutation({
    ...registerUserMutation(),
  });
};

export const useLoginUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: (data: AuthResponse) => {
      queryClient.invalidateQueries({
        queryKey: checkAuthQueryKey(),
      });
      localStorage.setItem('accessToken', data.accessToken);
    },
    ...loginUserMutation(),
  });
};

export const useProcessRefreshTokenMutation = () => {
  return useMutation({
    ...processRefreshTokenMutation(),
  });
};

export const useLogoutUserMutation = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToastNotification();
  return useMutation({
    onError: (error) => {
      showError(error);
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: checkAuthQueryKey() });
      localStorage.removeItem('accessToken');
      showSuccess('Пользователь успешно вышел из системы');
    },
    ...logoutUserMutation(),
  });
};
