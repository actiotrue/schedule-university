import { LessonsRouter } from "@/entities/lesson/ui/LessonsRouter";
import { ScheduleSidebar } from "@/entities/lesson/ui/ScheduleSidebar";
import { CreateLesson } from "@/features/manage-lesson";
import { Switch } from "@/shared/ui/generic";
import { ViewMode } from "@/types/view";
import { useState } from "react";


export default function LessonPage() {
  const [viewMode, setVeiwMode] = useState<ViewMode>('list');

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        <div className="md:w-3/5 lg:w-2/3 md:pr-8">
          <LessonsRouter viewMode={viewMode} />
        </div>
        <div className="md:w-2/5 lg:w-1/3 max-w-md mx-auto md:mx-0 sticky top-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <CreateLesson />
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <span
                  className={`mr-4 ${viewMode === 'list' ? 'font-semibold' : 'text-gray-500'}`}
                >
                  Лист
                </span>
                <Switch
                  className="border-green-600 bg-green-500 text-white checked:border-green-600 checked:bg-green-500 checked:text-white"
                  onChange={(e) =>
                    setVeiwMode(e.target.checked ? 'table' : 'list')
                  }
                />
              </div>
              <span
                className={`${viewMode === 'table' ? 'font-semibold' : 'text-gray-500'}`}
              >
                Таблица
              </span>
            </div>
          </div>
          <ScheduleSidebar />
        </div>
      </div>
    </div>
  );
}
