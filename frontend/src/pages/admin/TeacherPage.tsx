import { TeachersList } from "@/entities/teacher";
import { CreateTeacher } from "@/features/manage-teacher";

export default function TeacherPage() {
  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Редактирование преподавателей
          </h2>
          <p className="text-muted-foreground">
            Управляйте преподавателями и их деталями
          </p>
        </div>
        <CreateTeacher />
      </div>
      <TeachersList />
    </>
  );
}
