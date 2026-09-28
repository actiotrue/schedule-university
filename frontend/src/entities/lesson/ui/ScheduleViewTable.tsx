import { useState } from 'react';
import { DAYS_OF_WEAK, TIME_SLOTS } from '../model/consts';
import { EditLesson } from '@/features/manage-lesson/ui/EditLesson';
import { LessonById } from '@/client';

interface ScheduleViewTableProps {
  lessons?: LessonById[];
}

export const ScheduleViewTable = ({ lessons = [] }: ScheduleViewTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonById | null>(null);
  const findLesson = (dayId: number, timeId: number) => {
    return lessons.find(
      (lesson) => lesson.dayOfWeek === dayId && lesson.timeId === timeId,
    );
  };

  const handleLessonClick = (lesson: LessonById) => {
    if (lesson) {
      setSelectedLesson(lesson);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              {TIME_SLOTS.map((timeSlot) => (
                <th>{timeSlot.duration}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS_OF_WEAK.map((day) => (
              <tr key={day.id}>
                <th>{day.name}</th>
                {TIME_SLOTS.map((timeSlot) => {
                  const lesson = findLesson(day.id, timeSlot.id);
                  return (
                    <td className="p-0">
                      {lesson ? (
                        <button
                          onClick={() => handleLessonClick(lesson)}
                          className="w-full h-full p-4 text-left hover:bg-green-600 cursor-pointer border border-transparent
                 hover:border-black-200"
                        >
                          <div className="font-medium">
                            {lesson.subject.name}
                          </div>
                        </button>
                      ) : (
                        <div className="p-4 text-gray-300">—</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedLesson && (
        <EditLesson
          lesson={selectedLesson}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedLesson(null);
          }}
        />
      )}
    </>
  );
};
