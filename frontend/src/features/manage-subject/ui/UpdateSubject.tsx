import { useUpdateSubjectMutation } from '@/entities/subject';
import { Modal, Button, Update, FormInput, Switch } from '@/shared/ui/generic';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UpdateSubjectForm, updateSubjectFormSchema } from '../model/schema';
import { SubjectRead } from '@/client';

interface UpdateSubjectProps {
  subject: SubjectRead;
}

export const UpdateSubject = ({ subject }: UpdateSubjectProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateSubjectForm>({
    resolver: zodResolver(updateSubjectFormSchema),
    mode: 'onSubmit',
  });

  const updateSubjectMutation = useUpdateSubjectMutation();

  return (
    <Modal
      header="Изменить предмет"
      isOpen={isModalOpen}
      triggerButton={
        <Button
          icon={<Update />}
          onClick={() => {
            reset({ ...subject });
            setIsModalOpen(true);
          }}
        />
      }
      onClose={() => {
        setIsModalOpen(false);
      }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          updateSubjectMutation.mutate(
            { path: { subject_id: subject.id }, body: data },
            {
              onSuccess: () => {
                setIsModalOpen(false);
              },
            },
          );
        })}
        className="flex flex-col items-center justify-center space-y-4 w-full"
      >
        <FormInput
          label="Название предмета"
          placeholder="Введите название предмета"
          type="text"
          registration={register('name')}
          errorText={errors.name?.message}
        ></FormInput>
        <FormInput
          label="Cеместр"
          placeholder="Введите номер семестра"
          type="number"
          registration={register('semester', {
            setValueAs: (value) => (value === '' ? undefined : Number(value)),
          })}
          errorText={errors.semester?.message}
        ></FormInput>
        <FormInput
          label="Количество часов"
          placeholder="Введите количество часов"
          type="number"
          registration={register('totalHours', {
            setValueAs: (value) => (value === '' ? undefined : Number(value)),
          })}
          errorText={errors.totalHours?.message}
        ></FormInput>
        <div className="flex items-center gap-4 w-full">
          <Switch registration={register('isOptional')} />
          <span className="text-sm font-medium">Аудитория доступна</span>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={updateSubjectMutation.isPending}
        >
          Изменить предмет
        </Button>
      </form>
    </Modal>
  );
};
