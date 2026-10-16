import {
  createTeacherMutation,
  deleteTeacherMutation,
  getAllTeachersQueryKey,
  getTeacherByIdQueryKey,
  updateTeacherMutation,
} from '@/client/@tanstack/react-query.gen';
import { useToastNotification } from '@/shared/hooks/useToastNotification';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const teacherQueryKey = getAllTeachersQueryKey()[0].tags;

export const useCreateTeacherMutation = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToastNotification();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ tags: teacherQueryKey }],
      });
      showSuccess('Преподаватель успешно создан');
    },
    onError: (error: unknown) => {
      showError(error);
    },
    ...createTeacherMutation(),
  });
};

export const useUpdateTeacherMutation = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToastNotification();

  return useMutation({
    onSuccess: (data) => {
      queryClient.setQueryData(
        getTeacherByIdQueryKey({ path: { teacher_id: data.id } }),
        data,
      );
      queryClient.invalidateQueries({
        queryKey: [{ tags: teacherQueryKey }],
      });
      showSuccess('Преподаватель успешно изменен');
    },
    onError: (error: unknown) => {
      showError(error);
    },
    ...updateTeacherMutation(),
  });
};

export const useDeleteTeacherMutation = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToastNotification();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ tags: teacherQueryKey }],
      });
      showSuccess('Преподаватель успешно удален');
    },
    onError: (error) => {
      showError(error);
    },
    ...deleteTeacherMutation(),
  });
};
