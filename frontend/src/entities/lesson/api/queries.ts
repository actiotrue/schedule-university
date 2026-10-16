import { useQuery } from '@tanstack/react-query';
import { getLessonsOptions } from '@/client/@tanstack/react-query.gen';

export const useLessonsByRoomQuery = (roomId: number) => {
  return useQuery({
    ...getLessonsOptions({ query: { room: roomId } }),
  });
};

export const useLessonsByGroupQuery = (groupId: number) => {
  return useQuery({
    ...getLessonsOptions({ query: { group: groupId } }),
  });
};

export const useLessonsByTeacherQuery = (teacherId: number) => {
  return useQuery({
    ...getLessonsOptions({ query: { teacher: teacherId } }),
  });
};
