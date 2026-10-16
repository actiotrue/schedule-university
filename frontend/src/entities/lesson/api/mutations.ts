import {
  createLessonMutation,
  deleteLessonMutation,
  getLessonsQueryKey,
  updateLessonMutation,
} from '@/client/@tanstack/react-query.gen';
import { useToastNotification } from '@/shared/hooks/useToastNotification';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const lessonQueryKey = getLessonsQueryKey()[0].tags;

export const useCreateLessonMutation = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToastNotification();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ tags: lessonQueryKey }],
      });
      showSuccess('Урок успешно создан');
    },
    onError: (error: unknown) => {
      showError(error);
    },
    ...createLessonMutation(),
  });
};

export const useUpdateLessonMutation = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToastNotification();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ tags: lessonQueryKey }],
      });
      showSuccess('Урок успешно изменен');
    },
    onError: (error: unknown) => {
      showError(error);
    },
    ...updateLessonMutation(),
  });
};

export const useDeleteLessonMutation = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToastNotification();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ tags: lessonQueryKey }],
      });
      showSuccess('Урок успешно удален');
    },
    onError: (error) => {
      showError(error);
    },
    ...deleteLessonMutation(),
  });
};
