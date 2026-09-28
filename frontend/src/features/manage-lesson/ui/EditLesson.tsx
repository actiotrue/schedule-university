import { LessonById } from "@/client";
import { useUpdateLessonMutation } from "@/entities/lesson/api/mutations";
import { InputValues, TIME_SLOTS, DAYS_OF_WEAK, LESSON_TYPES } from "@/entities/lesson/model/consts";
import { Modal, FormSelect, Button, Autocomplete } from "@/shared/ui/generic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UpdateLessonForm, updateLessonSchema } from "../model/schema";
import { DeleteLesson } from "./DeleteLesson";
import { FormField } from "@/shared/ui/generic/FormField";
import { useGetGroupsQuery } from "@/entities/group";
import { useGetRoomsQuery } from "@/entities/room";
import { useGetSubjectsQuery } from "@/entities/subject";
import { useGetTeachersQuery } from "@/entities/teacher";


interface UpdateLessonProps {
  lesson: LessonById;
  isOpen: boolean;
  onClose: () => void;
}

export const EditLesson = ({
  lesson,
  isOpen,
  onClose,
}: UpdateLessonProps) => {
  const [inputValues, setInputValues] = useState<InputValues>({
    teacher: lesson.teacher?.fullName || '',
    room: lesson.room?.name || '',
    group: lesson.group?.name || '',
    subject: lesson.subject?.name || '',
  });

  const handleInputChange = (field: keyof InputValues, value: string) => {
    setInputValues((prev) => ({ ...prev, [field]: value }));
  };

  const teachersQuery = useGetTeachersQuery()
  const teachersOptions = teachersQuery.data?.map((teacher)=>({
    id: teacher.id,
    name: teacher.fullName
  })) 

  const roomsQuery = useGetRoomsQuery()
  const rooms = roomsQuery.data

  const groupsQuery = useGetGroupsQuery()
  const groups = groupsQuery.data

  const subjectsQuery = useGetSubjectsQuery()
  const subjects = subjectsQuery.data

  const updateLessonMutation = useUpdateLessonMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateLessonForm>({
    resolver: zodResolver(updateLessonSchema),
    mode: 'onSubmit',
  });

  useEffect(() => {
    setValue('dayOfWeek', lesson.dayOfWeek);
    setValue('timeId', lesson.timeId);
    setValue('type', lesson.type);
    setValue('groupId', lesson.group.id);
    setValue('roomId', lesson.room.id);
    setValue('subjectId', lesson.subject.id);
    setValue('teacherId', lesson.teacher.id);
  }, [lesson, setValue]);

  return (
    <>
      <Modal header="Изменить пару" isOpen={isOpen} onClose={onClose}>
        <form
          onSubmit={handleSubmit((data) =>
            updateLessonMutation.mutate({path:{ lesson_id: lesson.id}, body:data },{onSuccess:()=>{
              onClose()
            }}),
          )}
          className="flex flex-col items-center justify-center space-y-4 w-full"
        >
         <FormField label='Преподаватель' errorMessage={errors.teacherId?.message}>
          <Autocomplete 
          options={teachersOptions} 
          isLoading={teachersQuery.isLoading}
          inputValue={inputValues.teacher}
          onInputChange={(value)=>handleInputChange('teacher',value)}
          onSelect={(option)=>setValue('teacherId',option.id)}
          placeholder='Введите ФИО преподавателя'
          error={errors.teacherId?.message}
          />
        </FormField>
        <FormField label='Аудитория' errorMessage={errors.roomId?.message}>
          <Autocomplete 
          options={rooms} 
          isLoading={roomsQuery.isLoading}
          inputValue={inputValues.room}
          onInputChange={(value)=>handleInputChange('room',value)}
          onSelect={(option)=>setValue('roomId',option.id)}
          placeholder='Введите название аудитории'
          error={errors.roomId?.message}
          />
        </FormField>
        <FormField label='Группа' errorMessage={errors.groupId?.message}>
          <Autocomplete 
          options={groups} 
          isLoading={groupsQuery.isLoading}
          inputValue={inputValues.group}
          onInputChange={(value)=>handleInputChange('group',value)}
          onSelect={(option)=>setValue('groupId',option.id)}
          placeholder='Введите название группы'
          error={errors.teacherId?.message}
          />
        </FormField>
        <FormField label='Предмет' errorMessage={errors.subjectId?.message}>
          <Autocomplete 
          options={subjects} 
          isLoading={subjectsQuery.isLoading}
          inputValue={inputValues.subject}
          onInputChange={(value)=>handleInputChange('subject',value)}
          onSelect={(option)=>setValue('subjectId',option.id)}
          placeholder='Введите название предмета'
          error={errors.subjectId?.message}
          />
        </FormField>
          <div className="grid grid-cols-3 gap-4 w-full">
            {/* TODO: move to form field */}
            <FormSelect
              label="Время"
              registration={register('timeId')}
              errorText={errors.timeId?.message}
              defaultValue=""
            >
              <option value="" disabled>
                Выберите время
              </option>
              {TIME_SLOTS.map((time) => (
                <option key={time.id} value={time.id}>
                  {time.duration}
                </option>
              ))}
            </FormSelect>

            <FormSelect
              label="День недели"
              registration={register('dayOfWeek')}
              errorText={errors.dayOfWeek?.message}
              defaultValue=""
            >
              <option value="" disabled>
                Выберите день недели
              </option>
              {DAYS_OF_WEAK.map((day) => (
                <option key={day.id} value={day.id}>
                  {day.name}
                </option>
              ))}
            </FormSelect>
            <FormSelect
              label="Тип пары"
              registration={register('type')}
              errorText={errors.type?.message}
              defaultValue=""
            >
              <option value="" disabled>
                Выберите тип пары
              </option>
              {LESSON_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </FormSelect>
          </div>
          <Button
            type="submit"
            className="w-full"
            variant="base"
            disabled={updateLessonMutation.isPending}
          >
            Изменить пару
          </Button>
        </form>
        <div className="mt-4">
          <DeleteLesson lessonId={lesson.id} onSuccess={onClose} />
        </div>
      </Modal>
    </>
  );
};
