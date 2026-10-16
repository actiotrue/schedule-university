import {
  createRoomMutation,
  deleteRoomMutation,
  getAllRoomsQueryKey,
  getRoomByIdQueryKey,
  updateRoomMutation,
} from '@/client/@tanstack/react-query.gen';
import { useToastNotification } from '@/shared/hooks/useToastNotification';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const roomQueryKey = getAllRoomsQueryKey()[0].tags;

export const useCreateRoomMutation = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToastNotification();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ tags: roomQueryKey }],
      });
      showSuccess('Аудитория успешно создана');
    },
    onError: (error: unknown) => {
      showError(error);
    },
    ...createRoomMutation(),
  });
};

export const useUpdateRoomMutation = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToastNotification();

  return useMutation({
    onSuccess: (data) => {
      queryClient.setQueryData(
        getRoomByIdQueryKey({ path: { room_id: data.id } }),
        data,
      );
      queryClient.invalidateQueries({
        queryKey: [{ tags: roomQueryKey }],
      });
      showSuccess('Аудитория успешно изменена');
    },
    onError: (error: unknown) => {
      showError(error);
    },
    ...updateRoomMutation(),
  });
};

export const useDeleteRoomMutation = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToastNotification();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ tags: roomQueryKey }],
      });
      showSuccess('Аудитория успешно удалена');
    },
    onError: (error) => {
      showError(error);
    },
    ...deleteRoomMutation(),
  });
};
