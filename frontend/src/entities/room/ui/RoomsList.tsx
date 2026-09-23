import { UpdateRoom, DeleteRoom } from '@/features/manage-room';
import {
  Panel,
  PanelHeader,
  PanelBody,
  SearchInput,
  Select,
  Badge,
} from '@/shared/ui/generic';
import { useState } from 'react';
import { useGetRoomsQuery, useGetBuildingsQuery } from '../api/queries';
import { RiGroupLine } from 'react-icons/ri';

export const RoomsList = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBuilding, setSelectedBuilding] = useState<string>('all');

  const roomsQuery = useGetRoomsQuery();
  const rooms = roomsQuery.data;

  const buildingsQuery = useGetBuildingsQuery();
  const buildings = buildingsQuery.data;

  const filtredRooms = rooms?.filter((room) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = room.name.toLowerCase().includes(query);
    const matchesBuildings =
      selectedBuilding === 'all' || selectedBuilding === room.building?.name;
    return matchesSearch && matchesBuildings;
  });

  return (
    <>
      <Panel className="mb-8">
        <PanelHeader>Поиск</PanelHeader>
        <PanelBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 sm:flex-[2] min-w-0">
              <SearchInput
                value={searchQuery}
                placeholder="Введите название аудитории..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-0">
              <Select onChange={(e) => setSelectedBuilding(e.target.value)}>
                <option value={'all'}>Все копрусы</option>
                {buildings?.map((build) => (
                  <option key={build.id} value={build.name}>
                    {build.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </PanelBody>
      </Panel>
      <Panel>
        <PanelHeader>Аудитории ({rooms?.length})</PanelHeader>
        <PanelBody>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Этаж</th>
                  <th>Корпус</th>
                  <th>Вместимость</th>
                  <th>Статус</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {filtredRooms?.map((room) => (
                  <tr key={room.id}>
                    <th>{room.name}</th>
                    <td>{room.floor}</td>
                    <td>{room.building?.name}</td>
                    <td>
                      <RiGroupLine className="inline mr-1" />
                      {room.capacity}
                    </td>
                    <td>
                      {room.status === 1 ? (
                        <Badge variant="success">Доступно</Badge>
                      ) : (
                        <Badge variant="error">Занято</Badge>
                      )}
                    </td>
                    <td>
                      <UpdateRoom room={room} />
                      <DeleteRoom roomId={room.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PanelBody>
      </Panel>
    </>
  );
};
