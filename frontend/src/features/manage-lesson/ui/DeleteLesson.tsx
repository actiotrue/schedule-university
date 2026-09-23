import { useDeleteLessonMutation } from "@/entities/lesson/api/mutations";
import { Button } from "@/shared/ui/generic";


interface DeleteLessonProps {
  lessonId: number;
  onSuccess: () => void;
}

export const DeleteLesson = ({ lessonId, onSuccess }: DeleteLessonProps) => {
  const deleteLessonMutation = useDeleteLessonMutation();

  const handleDelete = () => {
    if (confirm('Удалить пару?')) {
      deleteLessonMutation.mutate({path:{lesson_id:lessonId}},{onSuccess:onSuccess});
    }
  };

  return (
    <Button variant="error" className="w-full" onClick={handleDelete}>
      Удалить пару
    </Button>
  );
};
