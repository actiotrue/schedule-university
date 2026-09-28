import { useCalendar } from "@/context/CalendarProvider";
import { Spinner } from "@/shared/ui/generic";
import { ViewMode } from "@/types/view";
import { useEffect } from "react";
import { useLessons } from "../hooks/useLessons";
import { ScheduleType } from "../model/consts";
import { ScheduleViewList } from "./ScheduleViewList";
import { ScheduleViewTable } from "./ScheduleViewTable";

interface ScheduleContainerProps {
  entityId: string;
  type: ScheduleType;
  viewMode: ViewMode;
}
export const ScheduleContainer = ({
  entityId,
  type,
  viewMode,
}: ScheduleContainerProps) => {
  const { selectedDayWeek, setHasLessonsOnDays } = useCalendar();

  const lessonsQuery = useLessons(type, entityId);
  const lessons = lessonsQuery.data;

  useEffect(() => {
    if (lessons) {
      const daysWithLessons = [
        ...new Set(lessons.map((lesson) => lesson.dayOfWeek)),
      ];
      setHasLessonsOnDays(daysWithLessons);
    } else if (!lessonsQuery.isLoading) {
      setHasLessonsOnDays([]);
    }
  }, [lessons, setHasLessonsOnDays, lessonsQuery.isLoading]);

  if (lessonsQuery.isLoading) return <Spinner />;

  return viewMode === 'list' ? (
    <ScheduleViewList lessons={lessons} selectedDayWeek={selectedDayWeek} />
  ) : (
    <ScheduleViewTable lessons={lessons} />
  );
};
