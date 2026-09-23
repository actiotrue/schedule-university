import {
  useUpdateTeacherMutation,
  DEPARTMENTS,
  TITLES,
} from '@/entities/teacher';
import {
  Modal,
  Button,
  Update,
  FormInput,
  FormSelect,
} from '@/shared/ui/generic';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UpdateTeacherForm, updateTeacherFormSchema } from '../model/schema';
import { TeacherRead } from '@/client';

interface UpdateTeacherProps {
  teacher: TeacherRead;
}

export const UpdateTeacher = ({ teacher }: UpdateTeacherProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTeacherForm>({
    resolver: zodResolver(updateTeacherFormSchema),
    mode: 'onSubmit',
  });

  const updateTeacherMutation = useUpdateTeacherMutation();

  return (
    <Modal
      header="Изменить преподавателя"
      isOpen={isModalOpen}
      triggerButton={
        <Button
          icon={<Update />}
          onClick={() => {
            reset({
              ...teacher,
              middleName: teacher.middleName ?? '',
              email: teacher.email ?? '',
              phone: teacher.phone ?? '',
            });
            setIsModalOpen(true);
          }}
        ></Button>
      }
      onClose={() => {
        setIsModalOpen(false);
        reset();
      }}
    >
      <form
        className="flex flex-col items-center justify-center space-y-4 w-full"
        onSubmit={handleSubmit((data) =>
          updateTeacherMutation.mutate(
            { path: { teacher_id: teacher.id }, body: data },
            {
              onSuccess: () => {
                setIsModalOpen(false);
              },
            },
          ),
        )}
      >
        <FormInput
          label="Фамилия"
          type="text"
          placeholder="Введите фамилию"
          registration={register('lastName')}
          errorText={errors.lastName?.message}
        />
        <FormInput
          label="Имя"
          type="text"
          placeholder="Введите имя"
          registration={register('firstName')}
          errorText={errors.firstName?.message}
        />
        <FormInput
          label="Отчество"
          type="text"
          placeholder="Введите отчество"
          registration={register('middleName')}
          errorText={errors.middleName?.message}
        />
        <div className="grid grid-cols-2 gap-4 w-full">
          <FormInput
            label="Email"
            type="email"
            placeholder="Введите email"
            registration={register('email')}
            errorText={errors.email?.message}
          />
          <FormInput
            label="Телефон"
            type="text"
            placeholder="Введите телефон"
            registration={register('phone')}
            errorText={errors.phone?.message}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          <FormSelect label="Кафедра" registration={register('department')}>
            {DEPARTMENTS.map((depart) => (
              <option key={depart} value={depart}>
                {depart}
              </option>
            ))}
          </FormSelect>
          <FormSelect label="Степень" registration={register('title')}>
            {TITLES.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </FormSelect>
        </div>
        <Button
          type="submit"
          disabled={updateTeacherMutation.isPending}
          className="w-full"
        >
          Изменить преподавателя
        </Button>
      </form>
    </Modal>
  );
};
