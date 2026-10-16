import { MdOutlineRoom } from 'react-icons/md';
import { SlGraduation } from 'react-icons/sl';
import { GrGroup } from 'react-icons/gr';
import { LessonById } from '@/client';
import { Badge } from '@/shared/ui/generic';
import { formatTeacherInitials } from '@/entities/teacher';

interface LessonCardProps {
  lesson: LessonById;
}

export const LessonCard = ({ lesson }: LessonCardProps) => {
  return (
    <div className="card card-lg w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h1 className="card-title flex-1">{lesson.subject.name}</h1>
          <Badge size="lg">{lesson.type}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <GrGroup />
          <p>{lesson.group.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <MdOutlineRoom />
          <p>{lesson.room.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <SlGraduation />
          <p>
            {formatTeacherInitials(
              lesson.teacher.firstName,
              lesson.teacher.lastName,
              lesson.teacher.middleName,
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
