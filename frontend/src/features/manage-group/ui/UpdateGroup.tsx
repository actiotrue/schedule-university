import { useUpdateGroupMutation, INSTITUTIES } from '@/entities/group';
import { COURSES } from '@/entities/group/model/consts';
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
import { UpdateGroupForm, updateGroupFormSchema } from '../model/schema';
import { GroupSummary } from '@/client';

interface UpdateGroupProps {
  group: GroupSummary;
}

export const UpdateGroup = ({ group }: UpdateGroupProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const updateGroupMutation = useUpdateGroupMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateGroupForm>({
    resolver: zodResolver(updateGroupFormSchema),
    mode: 'onSubmit',
  });

  return (
    <>
      <Modal
        header={'Изменить группу'}
        isOpen={isModalOpen}
        triggerButton={
          <Button
            icon={<Update />}
            onClick={() => {
              reset({ ...group });
              setIsModalOpen(true);
            }}
          />
        }
        onClose={() => setIsModalOpen(false)}
      >
        <form
          onSubmit={handleSubmit((data) =>
            updateGroupMutation.mutate(
              { path: { group_id: group.id }, body: data },
              {
                onSuccess: () => {
                  setIsModalOpen(false);
                },
              },
            ),
          )}
          className="flex flex-col items-center justify-center space-y-4 w-full"
        >
          <FormInput
            label="Название группы"
            placeholder="Введите название группы"
            errorText={errors.name?.message}
            registration={register('name')}
          />
          <FormSelect
            label="Курс"
            registration={register('course', {
              setValueAs: (value) => (value === '' ? undefined : Number(value)),
            })}
            errorText={errors.course?.message}
          >
            {COURSES.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </FormSelect>
          <FormSelect
            label="Институт"
            registration={register('institute')}
            errorText={errors.institute?.message}
          >
            {INSTITUTIES.map((inst) => (
              <option key={inst} value={inst}>
                {inst}
              </option>
            ))}
          </FormSelect>
          <div className="form-control w-full">
            <button
              type="submit"
              className="btn w-full"
              disabled={updateGroupMutation.isPending}
            >
              Изменить группу
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
