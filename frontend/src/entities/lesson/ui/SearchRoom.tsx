import { useCalendar } from '@/context/CalendarProvider';
import useAppSearchParams from '@/shared/hooks/useAppSearchParams';
import useDebounce from '@/shared/hooks/useDebounce';
import { Badge, Spinner, Combobox, List, ListItem } from '@/shared/ui/generic';
import { useState } from 'react';
import { ScheduleType } from '../model/consts';
import {
  useGetRoomQuery,
  useSearchRoomsQuery,
} from '@/entities/room/api/queries';

export const SearchRoom = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const { resetToToday } = useCalendar();
  const { updateParams, getParam } = useAppSearchParams();

  const selectedRoomQuery = useGetRoomQuery(getParam(ScheduleType.ROOM));
  const selectedRoom = selectedRoomQuery.data;

  const roomsSearchQuery = useSearchRoomsQuery(debouncedSearchTerm);
  const foundRooms = roomsSearchQuery.data;

  const handleRoomSelect = (roomId: string) => {
    setIsListOpen(false);
    resetToToday();
    updateParams({
      [ScheduleType.ROOM]: roomId,
      [ScheduleType.GROUP]: null,
      [ScheduleType.TEACHER]: null,
    });
    setInputValue('');
  };

  return (
    <div className="space-y-4">
      {selectedRoom && <Badge size="xl">{selectedRoom.name}</Badge>}
      {selectedRoomQuery.isLoading && <Spinner />}
      <Combobox
        inputValue={inputValue}
        setIsOpen={setIsListOpen}
        placeholder="Введите название аудитории"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      >
        {isListOpen && (foundRooms?.length ?? 0) > 0 && (
          <List>
            {foundRooms?.map((room) => (
              <ListItem
                key={room.id}
                onClick={() => {
                  handleRoomSelect(room.id);
                }}
              >
                {room.name}
              </ListItem>
            ))}
          </List>
        )}
        {isListOpen && roomsSearchQuery.isLoading && (
          <List>
            <Spinner />
          </List>
        )}
        {isListOpen &&
          !roomsSearchQuery.isLoading &&
          foundRooms?.length === 0 && (
            <List>
              <div className="p-3 text-center">Ничего не найдена</div>
            </List>
          )}
      </Combobox>
    </div>
  );
};
