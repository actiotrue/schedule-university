import { useCalendar } from '@/context/CalendarProvider';
import useAppSearchParams from '@/shared/hooks/useAppSearchParams';
import useDebounce from '@/shared/hooks/useDebounce';
import { Badge, Combobox, List, ListItem, Spinner } from '@/shared/ui/generic';
import { useState } from 'react';
import { ScheduleType } from '../model/consts';
import { useGetGroupQuery } from '@/entities/group';
import { useSearchGroupsQuery } from '@/entities/group/api/queries';

export const SearchGroup = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const { resetToToday } = useCalendar();
  const { updateParams, getParam } = useAppSearchParams();

  const selectedGroupQuery = useGetGroupQuery(getParam(ScheduleType.GROUP));
  const selectedGroup = selectedGroupQuery.data;

  const groupsSearchQuery = useSearchGroupsQuery(debouncedSearchTerm);
  const foundGoups = groupsSearchQuery.data;

  const handleGroupSelect = (groupId: string) => {
    setIsListOpen(false);
    resetToToday();
    updateParams({
      [ScheduleType.ROOM]: null,
      [ScheduleType.GROUP]: groupId,
      [ScheduleType.TEACHER]: null,
    });
    setInputValue('');
  };

  return (
    <div className="space-y-4">
      {selectedGroup && <Badge size="xl">{selectedGroup.name}</Badge>}
      <Combobox
        inputValue={inputValue}
        setIsOpen={setIsListOpen}
        placeholder="Введите название группы"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      >
        {isListOpen && (foundGoups?.length ?? 0) > 0 && (
          <List>
            {foundGoups?.map((group) => (
              <ListItem
                key={group.id}
                onClick={() => handleGroupSelect(group.id)}
              >
                {group.name}
              </ListItem>
            ))}
          </List>
        )}
        {isListOpen && groupsSearchQuery.isLoading && (
          <List>
            <Spinner />
          </List>
        )}
        {isListOpen &&
          !groupsSearchQuery.isLoading &&
          foundGoups?.length === 0 && (
            <List>
              <div className="p-3 text-center">Ничего не найдена</div>
            </List>
          )}
      </Combobox>
    </div>
  );
};
