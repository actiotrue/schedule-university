import { useToastNotification } from '@/shared/hooks/useToastNotification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createSubjectMutation,
  deleteSubjectMutation,
  getAllSubjectsQueryKey,
  getGroupByIdQueryKey,
  updateSubjectMutation,
} from '@/client/@tanstack/react-query.gen';

const subjectQueryKey = getAllSubjectsQueryKey()[0].tags;

export const useCreateSubjectMutation = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToastNotification();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ tags: subjectQueryKey }],
      });
      showSuccess('Предмет успешно создан');
    },
    onError: (error: unknown) => {
      showError(error);
    },
    ...createSubjectMutation(),
  });
};

export const useUpdateSubjectMutation = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToastNotification();

  return useMutation({
    onSuccess: (data) => {
      queryClient.setQueryData(
        getGroupByIdQueryKey({ path: { group_id: data.id } }),
        data,
      );
      queryClient.invalidateQueries({
        queryKey: [{ tags: subjectQueryKey }],
      });
      showSuccess('Предмет успешно изменен');
    },
    onError: (error: unknown) => {
      showError(error);
    },
    ...updateSubjectMutation(),
  });
};

export const useDeleteSubjectMutation = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToastNotification();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ tags: subjectQueryKey }],
      });
      showSuccess('Предмет успешно удален');
    },
    onError: (error) => {
      showError(error);
    },
    ...deleteSubjectMutation(),
  });
};
