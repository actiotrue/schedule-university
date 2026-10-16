import {
  getAllBuildingsOptions,
  getAllRoomsOptions,
  getRoomByIdOptions,
  searchRoomsByNameOptions,
} from '@/client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';

export const useGetBuildingsQuery = () => {
  return useQuery({
    ...getAllBuildingsOptions(),
  });
};

export const useGetRoomsQuery = () => {
  return useQuery({
    ...getAllRoomsOptions(),
  });
};

export const useGetRoomQuery = (roomId: number) => {
  return useQuery({
    ...getRoomByIdOptions({ path: { room_id: roomId } }),
  });
};

export const useSearchRoomsQuery = (roomName: string) => {
  const query = roomName.trim();
  return useQuery({
    ...searchRoomsByNameOptions({ query: { query: query } }),
  });
};
