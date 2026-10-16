import { useCalendar } from '@/context/CalendarProvider';
import useAppSearchParams from '@/shared/hooks/useAppSearchParams';
import useDebounce from '@/shared/hooks/useDebounce';
import { Badge, Combobox, List, ListItem, Spinner } from '@/shared/ui/generic';
import { useState } from 'react';
import { ScheduleType } from '../model/consts';
import {
  useGetTeacherQuery,
  useSearchTeachersQuery,
} from '@/entities/teacher/api/queries';
import { formatTeacherInitials } from '@/entities/teacher';

export const SearchTeacher = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const { resetToToday } = useCalendar();
  const { updateParams, getParam } = useAppSearchParams();

  const selectedTeacherQuery = useGetTeacherQuery(
    getParam(ScheduleType.TEACHER),
  );
  const selectedTeacher = selectedTeacherQuery.data;

  const searchTeachersQuery = useSearchTeachersQuery(debouncedSearchTerm);
  const foundTeachers = searchTeachersQuery.data;

  const handleTeacherSelect = (teacherId: string) => {
    setIsListOpen(false);
    resetToToday();
    updateParams({
      [ScheduleType.ROOM]: null,
      [ScheduleType.GROUP]: null,
      [ScheduleType.TEACHER]: teacherId,
    });
    setInputValue('');
  };

  return (
    <div className="space-y-4">
      {selectedTeacher && (
        <Badge size="xl">
          {formatTeacherInitials(
            selectedTeacher.firstName,
            selectedTeacher.lastName,
            selectedTeacher.middleName,
          )}
        </Badge>
      )}
      {selectedTeacherQuery.isLoading && <Spinner />}
      <Combobox
        inputValue={inputValue}
        setIsOpen={setIsListOpen}
        placeholder="Введите имя преподавателя"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      >
        {isListOpen && (foundTeachers?.length ?? 0) > 0 && (
          <List>
            {foundTeachers?.map((teacher) => (
              <ListItem
                key={teacher.id}
                onClick={() => handleTeacherSelect(teacher.id)}
              >
                {teacher.fullName}
              </ListItem>
            ))}
          </List>
        )}
        {isListOpen && searchTeachersQuery.isLoading && (
          <List>
            <Spinner />
          </List>
        )}
        {isListOpen &&
          !searchTeachersQuery.isLoading &&
          foundTeachers?.length === 0 && (
            <List>
              <div className="p-3 text-center">Ничего не найдена</div>
            </List>
          )}
      </Combobox>
    </div>
  );
};
