import { useToastNotification } from '@/shared/hooks/useToastNotification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createGroupMutation,
  deleteGroupMutation,
  getGroupByIdQueryKey,
  getGroupsSummaryQueryKey,
  updateGroupMutation,
} from '@/client/@tanstack/react-query.gen';

const groupsQueryKey = getGroupsSummaryQueryKey()[0].tags;

export const useCreateGroupMutation = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToastNotification();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ tags: groupsQueryKey }],
      });
      showSuccess('Группа успешно создана');
    },
    onError: (error: unknown) => {
      showError(error);
    },
    ...createGroupMutation(),
  });
};

export const useUpdateGroupMutation = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToastNotification();

  return useMutation({
    onSuccess: (data) => {
      queryClient.setQueryData(
        getGroupByIdQueryKey({ path: { group_id: data.id } }),
        data,
      );
      queryClient.invalidateQueries({
        queryKey: [{ tags: groupsQueryKey }],
      });
      showSuccess('Группа успешно изменена');
    },
    onError: (error: unknown) => {
      showError(error);
    },
    ...updateGroupMutation(),
  });
};

export const useDeleteGroupMutation = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToastNotification();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ tags: groupsQueryKey }],
      });
      showSuccess('Группа успешно удалена');
    },
    onError: (error) => {
      showError(error);
    },
    ...deleteGroupMutation(),
  });
};
