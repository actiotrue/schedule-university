import z from 'zod';

export const createGroupFormSchema = z.object({
  name: z.string().min(5, 'Поле должно содержать минимум 5 символов'),
  course: z
    .number()
    .gt(0, 'Курс не может быть меньше 1')
    .lte(6, 'Курс не может быть больше 6'),
  institute: z.string().min(3, 'Поле должно содержать минимум 5 символов'),
});

export type CreateGroupForm = z.infer<typeof createGroupFormSchema>;

export const updateGroupFormSchema = createGroupFormSchema;

export type UpdateGroupForm = z.infer<typeof updateGroupFormSchema>;
