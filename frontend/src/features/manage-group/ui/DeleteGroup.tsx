import { useDeleteGroupMutation } from '@/entities/group';
import { Button, Delete } from '@/shared/ui/generic';

interface DeleteGroupProps {
  groupId: number;
}

export const DeleteGroup = ({ groupId }: DeleteGroupProps) => {
  const deleteGroupMutation = useDeleteGroupMutation();

  const handleDelete = () => {
    if (confirm('Удалить группу?')) {
      deleteGroupMutation.mutate({ path: { group_id: groupId } });
    }
  };

  return <Button icon={<Delete />} onClick={handleDelete}></Button>;
};
