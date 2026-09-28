import { useDeleteTeacherMutation } from '@/entities/teacher';
import { Button, Delete } from '@/shared/ui/generic';

interface DeleteTeacherProps {
  teacherId: number;
}

export const DeleteTeacher = ({ teacherId }: DeleteTeacherProps) => {
  const deleteTeacherMutation = useDeleteTeacherMutation();

  const handleDelete = () => {
    if (confirm('Удалить аудиторию?')) {
      deleteTeacherMutation.mutate({ path: { teacher_id: teacherId } });
    }
  };
  return <Button icon={<Delete />} onClick={handleDelete}></Button>;
};
