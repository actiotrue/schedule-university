import { useCreateSubjectMutation } from '@/entities/subject';
import { Modal, Button, Create, FormInput, Switch } from '@/shared/ui/generic';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSubjectFormSchema } from '../model/schema';

export const CreateSubject = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSubjectFormSchema),
    defaultValues: { isOptional: true },
    mode: 'onSubmit',
  });

  const createSubjectMutation = useCreateSubjectMutation();

  return (
    <Modal
      header="Добавить новый предмет"
      isOpen={isModalOpen}
      triggerButton={
        <Button icon={<Create />} onClick={() => setIsModalOpen(true)}>
          Добавить предмет
        </Button>
      }
      onClose={() => {
        setIsModalOpen(false);
        reset();
      }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          createSubjectMutation.mutate(
            { body: data },
            {
              onSuccess: () => {
                setIsModalOpen(false);
              },
            },
          );
        })}
        className='className="flex flex-col items-center justify-center space-y-4 w-full'
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
            setValueAs: (value) => (value === undefined ? '' : Number(value)),
          })}
          errorText={errors.semester?.message}
        ></FormInput>
        <FormInput
          label="Количество часов"
          placeholder="Введите количество часов"
          type="number"
          registration={register('totalHours', {
            setValueAs: (value) => (value === undefined ? '' : Number(value)),
          })}
          errorText={errors.totalHours?.message}
        ></FormInput>
        <div className="flex items-center gap-4 w-full">
          <Switch registration={register('isOptional')} />
          <span className="text-sm font-medium">Предмет обязателен</span>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={createSubjectMutation.isPending}
        >
          Добавить предмет
        </Button>
      </form>
    </Modal>
  );
};
