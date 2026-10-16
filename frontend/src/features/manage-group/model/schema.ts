import z from 'zod';

export const createGroupFormSchema = z.object({
  name: z.string().min(5, 'Поле должно содержать минимум 5 символов'),
  course: z
    .number()
    .gt(0, 'Курс не может быть меньше 1')
    .lte(6, 'Курс не может быть больше 6'),
  departmentId: z.number().min(1, 'Выберите институт из списка'),
});

export type CreateGroupForm = z.infer<typeof createGroupFormSchema>;

export const updateGroupFormSchema = createGroupFormSchema;

export type UpdateGroupForm = z.infer<typeof updateGroupFormSchema>;
