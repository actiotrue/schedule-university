import {
  useLessonsByGroupQuery,
  useLessonsByRoomQuery,
  useLessonsByTeacherQuery,
} from '../api/queries';
import { ScheduleType } from '../model/consts';

export const useLessons = (type: ScheduleType, entityId: number) => {
  const hooksMap = {
    [ScheduleType.GROUP]: () => useLessonsByGroupQuery(entityId),
    [ScheduleType.ROOM]: () => useLessonsByRoomQuery(entityId),
    [ScheduleType.TEACHER]: () => useLessonsByTeacherQuery(entityId),
  };

  const useHook = hooksMap[type];
  if (!useHook) {
    throw new Error(`Unknown schedule type: ${type}`);
  }

  return useHook();
};
