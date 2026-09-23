import z from 'zod';

export const createRoomFormSchema = z.object({
  name: z.string().min(5, 'Поле должно содержать минимум 5 символов'),
  floor: z.number().gt(0, 'Значение должно быть больше 0'),
  capacity: z.number().gt(0, 'Значение должно быть больше 0'),
  status: z.number(),
  buildingId: z.number(),
});

export type CreateRoomForm = z.infer<typeof createRoomFormSchema>;

export const updateRoomFormSchema = createRoomFormSchema;

export type UpdateRoomForm = z.infer<typeof updateRoomFormSchema>;
