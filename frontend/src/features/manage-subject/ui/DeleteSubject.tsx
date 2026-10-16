import { useDeleteSubjectMutation } from '@/entities/subject';
import { Button, Delete } from '@/shared/ui/generic';

interface DeleteSubjectProps {
  subjectId: number;
}

export const DeleteSubject = ({ subjectId }: DeleteSubjectProps) => {
  const deleteRoomMutation = useDeleteSubjectMutation();

  const handleDelete = () => {
    if (confirm('Удалить аудиторию?')) {
      deleteRoomMutation.mutate({ path: { subject_id: subjectId } });
    }
  };
  return <Button icon={<Delete />} onClick={handleDelete}></Button>;
};
