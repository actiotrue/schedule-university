import { useDeleteRoomMutation } from '@/entities/room/api/mutations';
import { Button, Delete } from '@/shared/ui/generic';

interface DeleteRoomProps {
  roomId: number;
}

export const DeleteRoom = ({ roomId }: DeleteRoomProps) => {
  const deleteRoomMutation = useDeleteRoomMutation();

  const handleDelete = () => {
    if (confirm('Удалить аудиторию?')) {
      deleteRoomMutation.mutate({ path: { room_id: roomId } });
    }
  };

  return <Button icon={<Delete />} onClick={handleDelete}></Button>;
};
