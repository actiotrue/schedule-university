import z from 'zod';

export const createSubjectFormSchema = z.object({
  name: z.string().min(3, 'Поле должно содержать минимум 3 символа'),
  semester: z
    .number()
    .gt(0, 'Семестр должен быть больше 0')
    .lt(16, 'Семестр должен быть меньше 16'),
  totalHours: z.number().gt(0, 'Кол-во часов должно быть больше 0'),
  isOptional: z.boolean(),
});

export type CreateSubjectForm = z.infer<typeof createSubjectFormSchema>;

export const updateSubjectFormSchema = createSubjectFormSchema;

export type UpdateSubjectForm = z.infer<typeof updateSubjectFormSchema>;
