import { useUpdateRoomMutation, useGetBuildingsQuery } from '@/entities/room';
import {
  Modal,
  Button,
  Update,
  FormInput,
  FormSelect,
  Switch,
} from '@/shared/ui/generic';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UpdateRoomForm, updateRoomFormSchema } from '../model/schema';
import { RoomRead } from '@/client';

interface UpdateRoomProps {
  room: RoomRead;
}

export const UpdateRoom = ({ room }: UpdateRoomProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateRoomForm>({
    resolver: zodResolver(updateRoomFormSchema),
    mode: 'onSubmit',
  });

  const statusValue = watch('status');

  const updateRoomMutation = useUpdateRoomMutation();

  const buildingsQuery = useGetBuildingsQuery();
  const buildings = buildingsQuery.data;

  return (
    <Modal
      header="Изменить аудиторию"
      triggerButton={
        <Button
          icon={<Update />}
          onClick={() => {
            reset({
              ...room,
            });
            setIsModalOpen(true);
          }}
        />
      }
      onClose={() => {
        setIsModalOpen(false);
      }}
      isOpen={isModalOpen}
    >
      <form
        className="flex flex-col items-center justify-center space-y-4 w-full"
        onSubmit={handleSubmit((data) =>
          updateRoomMutation.mutate(
            { path: { room_id: room.id }, body: data },
            {
              onSuccess: () => {
                setIsModalOpen(false);
                reset();
              },
            },
          ),
        )}
      >
        <FormInput
          label="Название аудитории"
          placeholder="Введите название аудитории"
          registration={register('name')}
          errorText={errors.name?.message}
        />
        <FormInput
          label="Номер этажа"
          placeholder="Введите номер этажа"
          type="number"
          registration={register('floor', {
            setValueAs: (value) => (value === undefined ? '' : Number(value)),
          })}
          errorText={errors.floor?.message}
        />
        <FormInput
          label="Вместимость"
          placeholder="Введите вместимость ауд."
          type="number"
          registration={register('capacity', {
            setValueAs: (value) => (value === undefined ? '' : Number(value)),
          })}
          errorText={errors.capacity?.message}
        />
        <FormSelect
          label="Корпус"
          registration={register('buildingId', {
            setValueAs: (value) => (value === undefined ? '' : Number(value)),
          })}
          errorText={errors.buildingId?.message}
        >
          {buildings?.map((build) => (
            <option key={build.id} value={build.id}>
              {build.name}
            </option>
          ))}
        </FormSelect>
        <div className="flex items-center gap-4 w-full">
          <Switch
            checked={statusValue === 1}
            onChange={(e) => setValue('status', e.target.checked ? 1 : 0)}
          />
          <span className="text-sm font-medium">Аудитория доступна</span>
        </div>
        <div className="form-control w-full">
          <button
            type="submit"
            className="btn w-full"
            disabled={updateRoomMutation.isPending}
          >
            Изменить аудиторию
          </button>
        </div>
      </form>
    </Modal>
  );
};
