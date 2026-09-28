import { LessonCard } from './LessonCard';
import { TIME_SLOTS } from '../model/consts';
import { LessonById } from '@/client';
import { Badge } from '@/shared/ui/generic';

interface ScheduleViewListProps {
  lessons?: LessonById[];
  selectedDayWeek?: number;
}

export const ScheduleViewList = ({
  lessons = [],
  selectedDayWeek,
}: ScheduleViewListProps) => {
  const filtredLessons = lessons?.filter(
    (lesson) => lesson.dayOfWeek === selectedDayWeek,
  );
  return (
    <div className="px-6">
      <div className="flex flex-col gap-4">
        {TIME_SLOTS.map((timeSlot) => {
          const lessonForSlot = filtredLessons.find(
            (lesson) => lesson.timeId === timeSlot.id,
          );
          return (
            <div key={timeSlot.id} className="flex flex-col gap-2">
              <Badge size="lg">{timeSlot.duration}</Badge>
              {lessonForSlot && <LessonCard lesson={lessonForSlot} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
