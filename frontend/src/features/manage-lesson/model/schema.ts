import z from 'zod';

export const createLessonSchema = z.object({
  timeId: z.number().min(1, 'Выберите время'),
  dayOfWeek: z.number().min(1, 'Выберите день недели'),
  type: z.string().min(1, 'Выберите тип'),
  subjectId: z.number().min(1, 'Выберите предмет из списка'),
  teacherId: z.number().min(1, 'Выберите преподавателя из списка'),
  roomId: z.number().min(1, 'Выберите аудиторию из списка'),
  groupId: z.number().min(1, 'Выберите группу из списка'),
});

export type CreateLessonForm = z.infer<typeof createLessonSchema>;

export const updateLessonSchema = createLessonSchema;

export type UpdateLessonForm = z.infer<typeof updateLessonSchema>;
