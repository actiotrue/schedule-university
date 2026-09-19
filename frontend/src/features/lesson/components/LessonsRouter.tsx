import useAppSearchParams from '@/shared/hooks/useAppSearchParams';
import { ScheduleType } from '../types/consts';
import { ScheduleContainer } from './ScheduleContainer';
import { ViewMode } from '@/types/view';

interface LessonRouterProps {
  viewMode: ViewMode;
}

export const LessonsRouter = ({ viewMode }: LessonRouterProps) => {
  const { getParam } = useAppSearchParams();

  const currentGroupId = getParam(ScheduleType.GROUP);
  const currentTeacherId = getParam(ScheduleType.TEACHER);
  const currentRoomId = getParam(ScheduleType.ROOM);

  if (currentGroupId) {
    return (
      <ScheduleContainer
        viewMode={viewMode}
        entityId={currentGroupId}
        type={ScheduleType.GROUP}
      />
    );
  } else if (currentTeacherId) {
    return (
      <ScheduleContainer
        viewMode={viewMode}
        entityId={currentTeacherId}
        type={ScheduleType.TEACHER}
      />
    );
  } else if (currentRoomId) {
    return (
      <ScheduleContainer
        viewMode={viewMode}
        entityId={currentRoomId}
        type={ScheduleType.ROOM}
      />
    );
  } else {
    return null;
  }
};
