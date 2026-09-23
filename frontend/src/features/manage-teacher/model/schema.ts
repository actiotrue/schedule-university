import z from 'zod';

const minLenError = { message: 'Поле должно содержать минимум 5 символов' };

export const createTeacherFormSchema = z.object({
  firstName: z.string().min(5, minLenError),
  lastName: z.string().min(5, minLenError),
  department: z.string().min(5, minLenError),
  title: z.string().min(5, minLenError),

  middleName: z.string().min(5, minLenError).or(z.literal('')),
  email: z.email('Некорректный email').or(z.literal('')),
  phone: z.string().min(5, minLenError).or(z.literal('')),
});

export type CreateTeacherForm = z.infer<typeof createTeacherFormSchema>;

export const updateTeacherFormSchema = createTeacherFormSchema;

export type UpdateTeacherForm = z.infer<typeof updateTeacherFormSchema>;
